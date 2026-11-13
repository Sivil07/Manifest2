/*
    A ProjectItem is a custom element that displays a single project on the 
    Projects page and lets the user open it up. It follows the same patter as
    the IntentionItem but with a smaller job.

    What is shares with the IntentionITem:
        - It is give nits data through a setter (projectData), which will fill the 
          UI and store the project's id
        - It never changes the data. When the user acts, it announces it with a 
          bubbling custom event that only carries ids, so the controller can listen
          on the view that holds the <project-items>.
        - Each element in its shadow dom has a part attribute so the external stylesheet
          can style it with it.
        - It is a snapshot. It does not update itself when the data changes. After every change,
          the view clears the list and creates new <project-items> from the updated data.
    
    How it differs from the IntentionItem:
        - Its data is a project group, not an intention. A project group is a project paired with 
          its active intentions. It shows the project color, project name and number of active 
          intentions.
        - It sends on event, not three. The view-project carries the project's id, and the controller
          uses it to render that project's page. The <project-item> has no checkbox and no move-to
          button.
        - It's color is set using inline css because the color data for each project cannot be 
          effectively written in the stylesheet.
    
        Overall, a ProjectItem represents a single project in the UI and provides a way for the user 
        to navigate to that project's page.
*/

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

    /* Sets a project's data within a ProjectItem, updating its content and appearance. */    
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
