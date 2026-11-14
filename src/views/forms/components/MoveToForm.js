import { renderProjectOption } from "../factories/move-options.js";

/*
    MoveToForm is a custom element that allows the user to change an intention's 
    project assignment.

    The form displays the Inbox and all available projects as a group of radio options. 
    The intention's current location is automatically selected and marked as current 
    when the form is rendered.

    The formData setter receives the intention and available project data needed to build 
    the selection list. It also tracks whether an IntentionTemplate is currently open so 
    the controller can determine which UI elements should be refreshed or closed after the move
    operation completes.

    When submitted, the form dispatches an update-intention-project event containing the intention id, 
    selected project id, and template state information. An empty project id represents the Inbox.

    The component does not move intentions itself. Its responsibility is limited to presenting 
    available destinations and collecting the user's selection.

    The template contains internal styles that hide the native radio controls and provide custom 
    styling for focused and selected project options like with the ProjectForm.
*/

const template = document.createElement("template");
template.innerHTML = `
<style>
    input[type="radio"] {
        appearance: none;
    }
        
    .highlight-label:has(.highlight-radio:focus) {
        background-color: var(--clr-lavender);
    }
    
    .highlight-label:has(.highlight-radio:checked) {
        background-color: var(--clr-lavender);
    } 
</style>

<form part="move-to-form">
    <div part="move-to-header">
        <h2 part="title">Move To...</h2>
        <p part="subtitle">Choose a project for this intention</p>
    </div>
    <div part="project-options">

    </div>
    <div part="move-form-actions">
        <button type="button" part="move-action cancel-move">Cancel</button>
        <button type="submit" part="move-action submit-move">Move</button>
    </div>
`
class MoveToForm extends HTMLElement {
    #intentionId; 
    #isTemplateOpen;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    /* Builds the move options and selects the intention's current location. */
    set formData(data) {
        const projectOptions = this.shadowRoot.querySelector(`[part="project-options"]`);

        const projects = data.projectOptions;
        const intention = data.intention;

        let projectCount = 1;
        const inboxOption = this.createInboxOption(intention.projectId, projectCount);
        projectCount++

        projectOptions.appendChild(inboxOption)
        projects.forEach((project) => {
            const { projectId, projectName, projectColor, } = project;
            const projectOption = renderProjectOption(projectId, intention.projectId, projectName, projectColor, projectCount)
            projectOptions.appendChild(projectOption)
            projectCount++
        });

        this.#isTemplateOpen = data.isTemplateOpen
        this.#intentionId = intention.id
    }

    createInboxOption(intentionProjectId, projectCount) {
        const projectId = "";
        const projectName = "Inbox";
        const projectColor = "#808080";
        const inboxOption = renderProjectOption(projectId, intentionProjectId, projectName, projectColor, projectCount);
        return inboxOption;
    }

    connectedCallback() {
        const moveToForm = this.shadowRoot.querySelector(`[part="move-to-form"]`);
        moveToForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(moveToForm);
            const entries = Object.fromEntries(data.entries());
            const intentionPackage = { 
                isTemplateOpen: this.#isTemplateOpen,
                intentionId: this.#intentionId, 
                ...entries 
            }
            this.dispatchEvent( new CustomEvent("update-intention-project", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("move-to-form", MoveToForm);
