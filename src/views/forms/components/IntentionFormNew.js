const template = document.createElement("template");
template.innerHTML = `
<form part="intention-form-contents">
    <h2 part="form-header">New Intention</h2>
    <div part="title-group form-group">
        <label part="form-label" for="input-title">What do you intend to do?</label>
        <input id="input-title" part="intention-input" type="text" placeholder="Call the dentist" name="title"
            minlength="5" maxlength="20" required>
    </div>
    <div part="reason-group form-group">
        <label part="form-label" for="input-reason">Why does it matter?</label>
        <input id="input-reason" part="intention-input" type="text" placeholder="Your reason" name="reason" minlength="5"
            maxlength="20" required>
    </div>
    <div part="desc-group form-group">
        <label part="form-label" for="input-desc">Description (Optional)</label>
        <textarea part="intention-input form-desc-input" id="input-desc" name="desc" rows="4" minlength="5"
            maxlength="100"></textarea>
    </div>
    <div part="select-group form-group"
        <label part="form-label" for="input-select">Project (Optional)</label>
        <select name="projects-options" id="input-select" part="intention-input">
            <option value="" selected>No Project</option>
            <option value="finance">Finance</option>
            <option value="personal">Personal</option>
        </select>
    </div>
    <div id="date-group form-group">
        <label part="form-label" for="input-date">Due Date</label>
        <input id="input-date" part="intention-input" type="date" name="dueDate" required>
    </div>
    <div part="form-actions">
        <button part="form-action">Cancel</button>
        <button part="form-action submit-intention" type="submit">Add Intention</button>
    </div>
    <p part="form-note">No project? It goes to your Inbox.</p>
</form>
`
class IntentionFormNew extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }
}

customElements.define("intention-form", IntentionFormNew);
