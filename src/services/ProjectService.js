import Project from "../models/projects.js"
import { projectStarterData } from "../starterData.js";

/*  
    The ProjectService manages the application's projects. This includes creating,
    deleting, saving and looking them up by id. It also pairs project information with
    intentions it is given. This is so the views can show each project's name and the 
    intentions that belong to it.

    Like the IntentionService, this is the only place that knows where project data is stored. 
    It keeps them in one private list "allProjects" as Project instances, and saves them 
    to localStorage under "all-projects", and rebuilds the Project instances on each page reload.

    What is different is how it relates to intentions. The ProjectService does now own intentions.
    A project does not know which intentions belong to it. Each intention stores its project's id. The
    methods that combine the two (groupIntentionsByProject, transformIntentionList) work only with the 
    intentions that controller passes in. The ProjectService and IntentionService do not know about 
    each other.

    This also means deleting a project removes only the project. The controller is responsible for 
    removing that project's intentions through the IntentionService.

    The ProjectService only have one rule. A project names must be unique through the hasDuplicate
    method.
*/

class ProjectService {
    #allProjects = [];

    /* Project statistics and display data */

    get projectOptions() {
        const projectOptions = this.#allProjects.map((project) => {
            return { projectId: project.id, projectName: project.projectName, projectColor: project.projectColor }
        });
        return projectOptions;
    }

    get numberOfProjects() {
        return this.#allProjects.length;
    }

    /* Project and intention transformations */

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

        const result = [...projectGroups.values()]
        return result;
    }

    /* Transforms a list of intentions (active or completed)

       Each intention is paired with its associated project name so 
       both pieces of information can be displayed from a single object.

       This prevents the rendering methods for active and completed
       intentions from requiring a projectName argument since each
       intention object will have their projectName attached already.
    */
    transformIntentionList(intentionList) {
        let activeOrCompletedList = []
        intentionList.forEach((intention) => {
            const project = this.getProjectById(intention.projectId);
            const projectName = (project === undefined) ? "" : project.projectName;
            const intentionDetails = { projectName, intention }
            activeOrCompletedList.push(intentionDetails)
        });
        return activeOrCompletedList;
    }

    /* Project state changes */

    createProject(projectPackage) {
        const project = new Project(projectPackage);
        this.#allProjects.push(project);
        this.#saveAllProjects();
    }

    deleteProject(id) {
        const projectIndex = this.#allProjects.findIndex((project) => project.id === id);
        this.#allProjects.splice(projectIndex, 1);
        this.#saveAllProjects();
    }

    /* Project lookups */

    getProjectById(id) {
        const project = this.#allProjects.find((project) => project.id === id);
        return project;
    }

    /* Project validations */

    /*  Checks for whether a project name already exists. (true or false) */
    hasDuplicate(projectName) {
        const foundDuplicate = (project) => projectName.toLowerCase() === project.projectName.toLowerCase();
        return this.#allProjects.some((foundDuplicate));
    }

    /* Persistence */

    #saveAllProjects() {
        localStorage.setItem("all-projects", JSON.stringify(this.#allProjects));
    }

    /* Initialization */

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
