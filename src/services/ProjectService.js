import Project from "../models/projects.js"
import { projectStarterData } from "../starterData.js";

class ProjectService {
    #allProjects = [];

    /* Groups active intentions by their associated project. 
       
       Creates an entry for each project and adds the intentions that 
       belong to that project.
       
       Returns an array where each item contains a project and the
       list of active intentions that belong to it. 
       
       Will be used to in the SideBarView to display each project's name
       along with the number of active intentions
    */
    groupIntentionsByProject(activeIntentions) {
        const projectGroups = new Map();
        for (const project of this.#allProjects) {
            projectGroups.set(project.id, { project, intentions: [] })
        }

        for (const intention of activeIntentions) {
            const entry = projectGroups.get(intention.projectId)
            if (entry) entry.intentions.push(intention)
        }

        const result = [ ...projectGroups.values() ]
        return result;
    }

    createProject(projectPackage) {
        const project = new Project(projectPackage);
        this.#allProjects.push(project);
        this.#saveAllProjects();
    }

    getProjectById(id) {
        const project = this.#allProjects.find((project) => project.id === id);
        return project;
    }
    

    /*  Checks for whether a project name already exists. (true or false) */ 
    hasDuplicate(projectName) {
        const hasDuplicate = (project) => projectName.toLowerCase() === project.projectName.toLowerCase();
        return this.#allProjects.some((hasDuplicate));
    }

    #saveAllProjects() {
        localStorage.setItem("all-projects", JSON.stringify(this.#allProjects));
    }

    /* Loads the saved projects (or starter data on the first use) and rebuilds them
   as Projects  */
    loadProjects() {
        this.#allProjects = [];
        const savedAllProjectsData = localStorage.getItem("all-projects")
        const projectData = savedAllProjectsData === null ? projectStarterData : JSON.parse(savedAllProjectsData);
        projectData.forEach((savedProjectData) => {
            const project = new Project(savedProjectData);
            this.#allProjects.push(project);
        })

        if (savedAllProjectsData === null) this.#saveAllProjects();
    }
}

export default ProjectService;
