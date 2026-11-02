class Project {
    constructor({id = crypto.randomUUID() , projectName}) {
        this.id = id;
        this.projectName = projectName;
    }
}

export default Project;
