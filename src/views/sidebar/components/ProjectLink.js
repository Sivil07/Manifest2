const template = document.createElement("template");

template.innerHTML = `
<button type="button" part="project-link">
    <div part="project-color"></div>
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
        const projectColor = this.shadowRoot.querySelector(`[part="project-color"]`);

        projectName.textContent = projectGroup.project.projectName;
        projectCount.textContent = projectGroup.intentions.length;
        projectColor.style.backgroundColor = projectGroup.project.projectColor;

        this.#projectId = projectGroup.project.id;
    }

    connectedCallback() {
        const projectLink = this.shadowRoot.querySelector(`[part="project-link"]`);
        projectLink.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent( "view-project", {
                bubbles: true,
                detail: {
                    projectId: this.#projectId
                }
            }))
        });
    }
}


customElements.define("project-link", ProjectLink);
