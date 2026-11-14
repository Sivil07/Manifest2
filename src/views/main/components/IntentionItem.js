import { renderMoveToProjectButton } from "./factories/button-actions.js";
import { formatDueDateTag } from "../../../utils/date.js";

/* 
    An IntentionItem is a custom element that displays a single intention and lets
    the user interact with it. An intention holds the data and the IntentionItem defines
    how that data appears on how the user acts on it. An <intention-item> shows a checkbox,
    the title, the reason, the due data and a project tag. When an intention has no project,
    the tag is replaced with a move-to button so the user can sort it.

    An <intention-item> is given its data through the IntentionData setter, which expects 
    an Intention and the name of its project. It fills the UI and stores the intention's 
    id and projectId. The setter is called once per <intention-item>. It never changes the 
    Intention itself. When the user does something, it announces it with a custom event that
    carries the ids and any new information, such as the checked status. The controller passes
    that to the IntentionService, which finds the real intention and changes it before the page
    is reRendered. 

    The events bubble up so the controller can listen on them through the MainContentView that 
    will have the <intention-item>s nested inside. The events include:

        -move-intention-item: the checkbox was toggled so the detail carries the intention's id,
         its projectId and the new checked status (true or false)/
        -view-intention-item: the title and reason were clicked. The detail carries the intention's 
         and projectId.
        -open-move-form: the move-tot button was clicked. The detail carries the intention's id. 
    
    The move-to button is created by a factory function that does not know which intention it belongs
    to. When clicked, it dispatches a forward-move-event, which the parent item inside the <intention-item>
    listens for it and re-dispatches it as an open-move-forward event with the intention's id attached.

    Each element in the shadow dom has a part attribute so the external stylesheet can style it 
    with the it. 

    Overall, an IntentionItem is a snapshot of an intention at that moment it was rendered. It does
    not update itself when the intention changes. After every change in the service, the view clears
    its section and create new <intention-items> from the update data so the screen shows the current 
    state.
*/


const template = document.createElement("template");
template.innerHTML = `
<div part="intention-contents">
    <label for="intention-check" part="intention-label">
        <input id="intention-check" type="checkbox" part="input-check">
    </label>
    <button type="button" part="intention-text">
        <p part="intention-title"></p>
        <p part="intention-reason"></p>
    </button>
    <div part="intention-tags">
        <p part="tag project-name"></p>
        <p part="tag due-date"></p>
    </div>
</div>
`

class IntentionItem extends HTMLElement {
    #intentionId;
    #intentionProjectId
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    /* Sets an intention's data within a IntentionItem, updating its content and appearance. */
    set intentionData(data) {
        const title = this.shadowRoot.querySelector(`[part="intention-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="intention-reason"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="due-date"]`);
        const checkBox = this.shadowRoot.querySelector(`[part="input-check"]`);
        const projectName = this.shadowRoot.querySelector(`[part~="project-name"]`);
        const intentionContents = this.shadowRoot.querySelector(`[part~="intention-contents"]`)

        title.textContent = data.intention.title;
        reason.textContent = data.intention.reason;
        dueDate.textContent = formatDueDateTag(data.intention.dueDate);
        checkBox.checked = data.intention.isChecked;
        projectName.textContent = data.projectName;

        const hasProjectName = (data.projectName !== "");
        this.#updateProjectTag(hasProjectName, projectName, data.projectName)

        const status = data.intention.isChecked ? "completed" : "active";
        intentionContents.setAttribute("part", `intention-contents ${status}`)

        const textDecoration = data.intention.isChecked ? "strike-through" : "";
        title.setAttribute("part", `intention-title ${textDecoration}`)


        this.#intentionId = data.intention.id;
        this.#intentionProjectId = data.intention.projectId
    }

    #updateProjectTag(hasProjectName, projectElement, projectName) {
        if (!hasProjectName) {
            // Replace the project tag with a button to assign a project.
            const intentionTags = this.shadowRoot.querySelector(`[part="intention-tags"]`);
            const moveToButton = renderMoveToProjectButton();
            projectElement.remove();
            intentionTags.prepend(moveToButton)
            return;
        }

        projectElement.textContent = projectName;
    }

    connectedCallback() {
        const checkBox = this.shadowRoot.querySelector(`[part="input-check"]`);
        const intentionTextButton = this.shadowRoot.querySelector(`[part="intention-text"]`);
        const intentionTags = this.shadowRoot.querySelector(`[part="intention-tags"]`);

        checkBox.addEventListener("change", (e) => {
            const newCompletedStatus = e.target.checked;
            const intentionPackage = {
                newCompletedStatus: newCompletedStatus,
                intentionId: this.#intentionId,
                projectId: this.#intentionProjectId
            }
            this.dispatchEvent(new CustomEvent("move-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        });

        intentionTextButton.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.#intentionId,
                projectId: this.#intentionProjectId
            }
            this.dispatchEvent(new CustomEvent("view-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })

        intentionTags.addEventListener("forward-move-event", () => {
            const intentionPackage = {
                intentionId: this.#intentionId
            }
            this.dispatchEvent(new CustomEvent("open-move-form", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("intention-item", IntentionItem);
