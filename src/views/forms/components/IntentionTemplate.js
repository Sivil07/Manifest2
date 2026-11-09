const template = document.createElement("template");
template.innerHTML = `
<div part="template-contents">
    <div part="template-tags">
        <p part="temp-tag temp-due-date">November 3rd</p>
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

    set templateData(intentionData) {
        const title = this.shadowRoot.querySelector(`[part="template-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="template-reason"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="temp-due-date"]`);
        const description = this.shadowRoot.querySelector(`[part="template-desc"]`);

        title.textContent = intentionData.intention.title;
        reason.textContent = `Intention: ${intentionData.intention.reason}`
        dueDate.textContent = intentionData.intention.dueDate;

        const isEmptyString = intentionData.intention.description === undefined || intentionData.intention.description.length === 0;
        description.textContent = (isEmptyString) ? "No Description yet" : intentionData.intention.description;

        this.#intentionId = intentionData.intention.id;
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector(`[part~="close-template"]`);
        const deleteButton = this.shadowRoot.querySelector(`[part~="delete-intention"]`);
        const editButton = this.shadowRoot.querySelector(`[part~="edit-intention"]`);

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




