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
    <button part="form-submit" type="submit"></button>
</form>
`

class TodoForm extends HTMLElement {
    #todoId;
    #todoChecked;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set formData({ title = "", reason = "", id = undefined, isChecked = false } = {}) {
        const header = this.shadowRoot.querySelector(`[part="form-header"]`);
        const titleInput = this.shadowRoot.querySelector(`[part="form-input-title"]`);
        const reasonInput = this.shadowRoot.querySelector(`[part="form-input-reason"]`);
        const submitButton = this.shadowRoot.querySelector(`[part="form-submit"]`);
        titleInput.value = title;
        reasonInput.value = reason;
        this.#todoId = id;
        this.#todoChecked = isChecked;
        header.textContent = this.#todoId ? "Edit Todo" : "New Todo";
        submitButton.textContent = this.#todoId ? "Edit Todo" : "Add Todo";
    }

    connectedCallback() {
        const form = this.shadowRoot.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const entries = Object.fromEntries(data.entries());
            const todoPackage = {
                todoEntries: entries,
                todoId: this.#todoId,
                todoChecked: this.#todoChecked,
            }
            this.dispatchEvent( new CustomEvent( "save-todo", {
                bubbles: true,
                detail: {
                    todoPackage: todoPackage
                }
            }));
        })
    }
}

customElements.define("todo-form", TodoForm);
