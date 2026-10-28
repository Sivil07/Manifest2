import { getCompletedByDayOfWeek } from "../../utils/date.js";

const template = document.createElement("template");
template.innerHTML = `
<div part="template-contents">
    <div part="template-tags">
        <span part="template-due-date"></span>
    </div>
    <div part="template-display">
        <h1 part="template-title"></h1>
        <p part="template-reason"></p>
    </div>
    <div part="template-desc-container">
        <span part="template-desc-header">description</span>
        <p part="template-desc"></p>
    </div>
    <div part="button-group">
        <button part="template-actions edit-todo">Edit</button>
        <button part="template-actions delete-todo">Delete</button>
    </div>
</div>
<div part="close-container">
    <button part="template-actions close-template">X</button>
</div>
`

class IntentionTemplate extends HTMLElement {
    intentionId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set templateData(intentionData) {
        const title = this.shadowRoot.querySelector(`[part="template-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="template-reason"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="template-due-date"]`);
        const description = this.shadowRoot.querySelector(`[part="template-desc"]`);
        title.textContent = intentionData.title;
        reason.textContent = intentionData.reason;
        dueDate.textContent = getCompletedByDayOfWeek(intentionData.dueDate);

        const isEmptyString = intentionData.description === undefined || intentionData.description.length === 0;
        description.textContent = (isEmptyString) ? "No Description yet" : intentionData.description;

        this.intentionId = intentionData.id;
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector(`[part~="close-template"]`);
        closeButton.addEventListener("click", () => {
            this.remove();
        });


        const deleteButton = this.shadowRoot.querySelector(`[part~="delete-todo"]`);
        deleteButton.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.intentionId,
            }
            this.dispatchEvent( new CustomEvent( "delete-todo-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        });

        const editButton = this.shadowRoot.querySelector(`[part~="edit-todo"]`);
        editButton.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.intentionId,
            }
            this.dispatchEvent( new CustomEvent("edit-todo-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("intention-template", IntentionTemplate);
