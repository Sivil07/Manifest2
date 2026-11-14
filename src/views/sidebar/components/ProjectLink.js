/*
    ProjectLink is a custom element that represents a single project within 
    the sidebar's project navigation.
    
    The SidebarView creates one ProjectLink for each project group and provides 
    its data through the projectData setter. The component displays the project's 
    color, name, and number of active intentions.

    Unlike ProjectItem, which is rendered within the Projects page, ProjectLink is 
    used exclusively for navigation. When selected, it dispatches a view-project 
    event containing the project's id so the controller can load the corresponding 
    specific project page.

    The component does not retrieve project data itself and does not decide what 
    happens when a project is selected. Its responsibility is limited to presenting 
    project information and notifying the rest of the application when the user 
    requests to view a project.

    Like other custom elements in the application, ProjectLink is a snapshot of the 
    data provided to it. The sidebar is rebuilt from the latest project data whenever 
    the application state changes.
*/

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
            const projectPackage = {
                projectId: this.#projectId
            }
            this.dispatchEvent(new CustomEvent( "view-project", {
                bubbles: true,
                detail: {
                    projectPackage: projectPackage
                }
            }))
        });
    }
}

customElements.define("project-link", ProjectLink);
