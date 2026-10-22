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
    <button part="form-submit" type="submit">Add Todo</button>
</form>
`

class TodoForm extends HTMLElement {
    #todoId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set formData({ title = "", reason = "", id = undefined } = {}) {
        const header = this.shadowRoot.querySelector(`[part="form-header"]`);
        const titleInput = this.shadowRoot.querySelector(`[part="form-input-title"]`);
        const reasonInput = this.shadowRoot.querySelector(`[part="form-input-reason"]`);
        titleInput.value = title;
        reasonInput.value = reason;
        this.#todoId = id;
        header.textContent = this.#todoId ? "Edit Todo" : "New Todo";
    }

    connectedCallback() {
        const form = this.shadowRoot.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const entries = Object.fromEntries(data.entries());
            this.dispatchEvent( new CustomEvent( "save-todo", {
                bubbles: true,
                detail: {
                    todoDetails: entries,
                    todoId: this.#todoId
                }
            }));
        })
    }
}

customElements.define("todo-form", TodoForm);
