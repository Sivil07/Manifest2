import { renderProjectOption } from "../factories/select-option.js";

const template = document.createElement("template");
template.innerHTML = `
<form part="intention-form-contents">
    <h2 part="form-header">New Intention</h2>
    <div part="title-group form-group">
        <label part="form-label" for="input-title">What do you intend to do?</label>
        <input id="input-title" part="intention-input form-title" type="text" placeholder="Call the dentist" name="title"
            minlength="5" maxlength="20" required>
    </div>
    <div part="reason-group form-group">
        <label part="form-label" for="input-reason">Why does it matter?</label>
        <input id="input-reason" part="intention-input form-reason" type="text" placeholder="Your reason" name="reason" minlength="5"
            maxlength="20" required>
    </div>
    <div part="desc-group form-group">
        <label part="form-label" for="input-desc">Description (Optional)</label>
        <textarea part="intention-input form-desc-input" id="input-desc" name="description" rows="4" minlength="5"
            maxlength="100"></textarea>
    </div>
    <div part="select-group form-group">
        <label part="form-label" for="input-select">Project (Optional)</label>
        <select name="projectId" id="input-select" part="intention-input form-select">
            <option value="" selected>No Project</option>
        </select>
    </div>
    <div part="date-group form-group">
        <label part="form-label" for="input-date">Due Date</label>
        <input id="input-date" part="intention-input form-date" type="date" name="dueDate" required>
    </div>
    <div part="form-actions">
        <button part="form-action cancel-intention">Cancel</button>
        <button part="form-action submit-intention" type="submit">Add Intention</button>
    </div>
    <p part="form-note">No project? It goes to your Inbox.</p>
</form>
`
class IntentionFormNew extends HTMLElement {
    #intentionId;
    #projectId;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set formData({ projectOptions = [], title = "", reason = "", id = undefined, projectId = "", dueDate = "", description = "" } = {}) {
        const header = this.shadowRoot.querySelector(`[part="form-header"]`);
        const submitButton = this.shadowRoot.querySelector(`[part~="submit-intention"]`)
        const intentionTitle = this.shadowRoot.querySelector(`[part~="form-title"]`);
        const intentionReason = this.shadowRoot.querySelector(`[part~="form-reason"]`);
        const intentionDesc = this.shadowRoot.querySelector(`[part~="form-desc-input"]`);
        const intentionProject = this.shadowRoot.querySelector(`[part~="form-select"]`);
        const intentionDate = this.shadowRoot.querySelector(`[part~="form-date"]`);

        this.#intentionId = id;
        this.#projectId = projectId;

        header.textContent = this.#intentionId ? "Edit Intention" : "New Intention";
        submitButton.textContent = this.#intentionId ? "Save Changes" : "Add Intention";
        intentionTitle.value = title;
        intentionReason.value = reason;
        intentionDesc.value = description;
        this.appendProjectOptions(projectOptions, intentionProject)
        intentionProject.value = projectId;
        intentionDate.value = dueDate;
    }

    appendProjectOptions(projectOptions, select) {
        projectOptions.forEach((optionData) => {
            const option = renderProjectOption(optionData);
            select.appendChild(option)
        })
    }

    connectedCallback() {
        const cancelButton = this.shadowRoot.querySelector(`[part~="cancel-intention"]`);
        const form = this.shadowRoot.querySelector(`[part="intention-form-contents"]`);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const entries = Object.fromEntries(data.entries());
            const hasIntentionId = this.#intentionId;
            const intentionPackage = {
                entries: entries,
                hasIntentionId: hasIntentionId,
                projectId: this.#projectId
            }
            
            this.dispatchEvent(new CustomEvent("save-intention", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })

        cancelButton.addEventListener("click", () => {
            this.dispatchEvent(
                new CustomEvent("close-form", {
                    bubbles: true
                })
            )
        })
    }
}

customElements.define("intention-form", IntentionFormNew);
