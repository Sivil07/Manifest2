import { setMinDate, getCurrentDate } from "../../utils/date.js";

const template = document.createElement("template");
template.innerHTML = `
<form part="form-dialog">
    <h2 part="form-header"></h2>
    <div part="form-group">
        <label part="form-label" for="">What do you intend to do?</label>
        <input part="form-input-title"  type="text" placeholder="Call the dentist" name="title" minlength="5" maxlength="20" required>
    </div>
    <div part="form-group">
        <label part="form-label" for="">Why does it matter?</label>
        <input part="form-input-reason" type="text" placeholder="Your reason" name="reason" minlength="5" maxlength="20" required>
    </div>
    <div part="form-group">
        <label part="form-label" for="form-input-desc">Description (Optional)</label>
        <textarea part="form-description" id="form-input-desc" name="desc" rows="4" minlength="5" maxlength="100"></textarea>
    </div>
    <div part="form-group">
        <label part="form-label" for="">Due Date</label>
        <span part="form-reminder remove-reminder">Due today todos need a new date. Tomorrow is selected, but you can change it.</span>
        <input part="form-input-date" type="date" name="dueDate" required>
    </div>
    <button part="form-submit" type="submit"></button>
</form>
`

class IntentionForm extends HTMLElement {
    #intentionId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set formData({ title = "", reason = "", id = undefined, dueDate = "", description = "" } = {}) {
        const header = this.shadowRoot.querySelector(`[part="form-header"]`);
        const titleInput = this.shadowRoot.querySelector(`[part="form-input-title"]`);
        const reasonInput = this.shadowRoot.querySelector(`[part="form-input-reason"]`);
        const dateInput = this.shadowRoot.querySelector(`[part="form-input-date"]`);
        const submitButton = this.shadowRoot.querySelector(`[part="form-submit"]`);
        const formDescription = this.shadowRoot.querySelector(`[part="form-description"]`)
        const formReminder = this.shadowRoot.querySelector(`[part~="form-reminder"]`);
        dateInput.min = setMinDate();
        titleInput.value = title;
        reasonInput.value = reason;
        formDescription.value = description;
        this.#intentionId = id;
        
        header.textContent = this.#intentionId ? "Edit Todo" : "New Todo";
        submitButton.textContent = this.#intentionId ? "Edit Todo" : "Add Todo";
        
        const isDueToday = (dueDate !== "" && dueDate === getCurrentDate())
        if (isDueToday) formReminder.setAttribute("part", "form-reminder")
        dateInput.value = isDueToday ? setMinDate() : dueDate;  
    }

    connectedCallback() {
        const form = this.shadowRoot.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const entries = Object.fromEntries(data.entries());
            const intentionPackage = {
                intentionEntries: entries,
                intentionId: this.#intentionId,
            }
            this.dispatchEvent( new CustomEvent( "save-todo", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }));
        })
    }
}

customElements.define("intention-form", IntentionForm);
