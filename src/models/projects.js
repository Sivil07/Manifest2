/*
    A Project is the second core data model of the application.

    It represents a group that the user creates to organize related
    intentions, such as "Finance" or "Personal". It defines the complete
    shape of a project as it passes throughout the system.

    Similar to Intention, it defines its structure in one place so every
    part of the application uses the same shape, and it provides methods
    for updating its own properties. It also has the same limitations. This
    includes not managing storage, filtering, rendering or state.

    However, it differs in how it relates to intentions. A project groups
    many intentions but does not hold or track them. Each intention stores
    its project's id in its projectId property, so the intentions of a
    project are found by filtering the intentions list.

    Overall, the Project model acts as a single source of truth for an
    individual project. The services, views and controller handle 
    other application behavior and data presentation.
*/

class Project {
    constructor({ id = crypto.randomUUID(), projectName, projectColor }) {
        this.id = id;
        this.projectName = projectName;
        this.projectColor = projectColor;
    }

    /* Updates the details of an project (used in ProjectForm) */
    applyUpdates({ projectName, projectColor }) {
        this.projectName = projectName;
        this.projectColor = projectColor;
    }
}

export default Project;
