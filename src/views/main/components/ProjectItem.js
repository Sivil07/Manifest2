const template = document.createElement("template");

template.innerHTML = `
<button type="button" part="project-action">
    <div part="project-color"></div>
    <div part="project-data">
        <p part="project-name"></p>
        <p part="project-count"></p>
    </div>
</button
`

class ProjectItem extends HTMLElement {
    #projectId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set projectData(projectGroup) {
        const projectName = this.shadowRoot.querySelector(`[part="project-name"]`);
        const projectCount = this.shadowRoot.querySelector(`[part="project-count"]`);
        const projectColor = this.shadowRoot.querySelector(`[part="project-color"]`);

        projectName.textContent = projectGroup.project.projectName;
        projectCount.textContent = `${projectGroup.intentions.length} Intentions`;
        projectColor.style.backgroundColor = projectGroup.project.projectColor;

        this.#projectId = projectGroup.project.id;
    }

    connectedCallback() {
        const projectAction = this.shadowRoot.querySelector(`[part="project-action"]`);
        projectAction.addEventListener("click", () => {
            const projectPackage = {
                projectId: this.#projectId
            }
            this.dispatchEvent(new CustomEvent("view-project", {
                bubbles: true,
                detail: {
                    projectPackage: projectPackage
                }
            }))
        });

    }
}

customElements.define("project-item", ProjectItem);
