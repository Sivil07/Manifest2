const template = document.createElement("template");

template.innerHTML = `
<button type="button" part="project-link">
    <span part="project-color"></span>
    <p part="project-name"></p>
    <p part="projects-count"></p>
</button>
`

class ProjectLink extends HTMLElement {
    #projectId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    /*  Updates the ProjectLink's display based on the provided 
        projectGroup data.

        Sets the project name and the number of active intentions 
        shown in the component. 

        The project id is stored as well for later use if need be.
    */
    set projectData(projectGroup) {
        const projectName = this.shadowRoot.querySelector(`[part="project-name"]`);
        const projectCount = this.shadowRoot.querySelector(`[part="projects-count"]`);

        projectName.textContent = projectGroup.project.projectName;
        projectCount.textContent = projectGroup.intentions.length;

        this.#projectId = projectGroup.project.id;
    }
}


customElements.define("project-link", ProjectLink);
