class Project {
    constructor({id = crypto.randomUUID() , projectName, projectColor}) {
        this.id = id;
        this.projectName = projectName;
        this.projectColor = projectColor;
    }
}

export default Project;
