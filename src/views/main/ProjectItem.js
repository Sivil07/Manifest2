const template = document.createElement("template");

template.innerHTML = `
<button type="button" part="project">
    <span part="project-color"></span>
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

        projectName.textContent = projectGroup.project.projectName;
        projectCount.textContent = `${projectGroup.intentions.length} Intentions`;
        
        this.#projectId = projectGroup.project.id;
    }
}

customElements.define("project-item", ProjectItem);
