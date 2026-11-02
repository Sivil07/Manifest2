import Project from "../models/projects.js"
import { projectStarterData } from "../starterData.js";

class ProjectService {
    #allProjects = [];

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
