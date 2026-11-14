import { renderMoveToProjectButton } from "../../main/components/factories/button-actions.js";
import { formatDueDateTag } from "../../../utils/date.js";

/*
    IntentionTemplate is a custom element that displays the detailed view 
    of a single intention. While IntentionItem represents an intention within
    a list, IntentionTemplate presents information that is not visible from the
    list view. This includes an intention's project assignment, due date, reason
    and description.

    The component receives an intention and project name through the templateData setter.
    It does not directly modify intention data. Instead, it dispatches events that allow
    the controller to coordinate edit, move and delete operations.

    It dispatches the following events:
        - edit-intention-item: carries the intention is and project id.
        - delete-intention-item: carries the intention id
        - open-move-form: carries the intention id and the isTemplate boolean
          so the move event can determine whether the template is opened behind the form
    
    The Move To Project button is created through a factory function and does not know which intention
    it belongs to. Similar to the IntentionItem, the button dispatches a forward-move-event so the 
    <intention-template> can catch it and re-dispatch it to the controller with the information
    attached.

    Unlike the edit, move and delete actions, the close button simply removes the template from the 
    page without dispatching an event.
*/

const template = document.createElement("template");
template.innerHTML = `
<div part="template-contents">
    <div part="template-tags">
        <p part="temp-tag temp-project"></p>
        <p part="temp-tag temp-due-date"></p>
    </div>
    <div part="template-display">
        <h2 part="template-title">Do MY Assignment Tonight</h2>
        <p part="template-reason">Because its due tomorrow</p>
    </div>
    <div part="template-desc-container">
        <p part="template-desc-header">description</p>
        <p part="template-desc">Lots of Lots</p>
    </div>
    <div part="template-actions">
        <button part="temp-action edit-intention">Edit</button>
        <button part="temp-action delete-intention">Delete</button>
    </div>
</div>
<div part="close-container">
    <button part="temp-action close-template">X</button>
</div>
`

class IntentionTemplate extends HTMLElement {
    #intentionId;
    #projectId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    /* Updates the template's content using the supplied intention and project data. */
    set templateData(data) {
        const title = this.shadowRoot.querySelector(`[part="template-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="template-reason"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="temp-due-date"]`);
        const description = this.shadowRoot.querySelector(`[part="template-desc"]`);
        const project = this.shadowRoot.querySelector(`[part~="temp-project"]`)

        this.#addMoveToProjectButton();

        title.textContent = data.intention.title;
        reason.textContent = `Intention: ${data.intention.reason}`
        dueDate.textContent = formatDueDateTag(data.intention.dueDate);

        const isEmptyString = data.intention.description === undefined || data.intention.description.length === 0;
        description.textContent = (isEmptyString) ? "No Description yet" : data.intention.description;

        project.textContent = data.projectName !== "" ? data.projectName : "Inbox";

        this.#intentionId = data.intention.id;
        this.#projectId = data.intention.projectId;
    }

    #addMoveToProjectButton() {
        const templateActions = this.shadowRoot.querySelector(`[part="template-actions"]`);
        const deleteButton = this.shadowRoot.querySelector(`[part~="delete-intention"]`);
        const moveToButton = renderMoveToProjectButton();
        templateActions.insertBefore(moveToButton, deleteButton)
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector(`[part~="close-template"]`);
        const deleteButton = this.shadowRoot.querySelector(`[part~="delete-intention"]`);
        const editButton = this.shadowRoot.querySelector(`[part~="edit-intention"]`);
        const templateActions = this.shadowRoot.querySelector(`[part="template-actions"]`);

        templateActions.addEventListener("forward-move-event", () => {
            const isTemplateOpen = true;
            const intentionPackage = {
                intentionId: this.#intentionId,
                isTemplateOpen: isTemplateOpen
            }
            this.dispatchEvent( new CustomEvent( "open-move-form", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            } ) )
        })

        closeButton.addEventListener("click", () => {
            this.remove()
        });

        editButton.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.#intentionId,
                projectId: this.#projectId
            }
            this.dispatchEvent(new CustomEvent("edit-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })

        deleteButton.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.#intentionId
            }
            this.dispatchEvent(new CustomEvent("delete-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        });
    }
}

customElements.define("intention-template", IntentionTemplate);




