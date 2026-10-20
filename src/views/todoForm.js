const template = document.createElement("template");
template.innerHTML = `
<form part="form-dialog">
    <h2 part="form-header">New Todo</h2>
    <div part="form-group">
        <label part="form-label" for="">What do you intend to do?</label>
        <input type="text" placeholder="Call the dentist" name="title" minlength="5" maxlength="20" required>
    </div>
    <div part="form-group">
        <label part="form-label" for="">Why does it matter?</label>
        <input type="text" placeholder="Your reason" name="reason" minlength="5" maxlength="20" required>
    </div>
    <button part="form-submit" type="submit">Add Todo</button>
</form>
`

class TodoForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        const form = this.shadowRoot.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const entries = Object.fromEntries(data.entries());
            this.dispatchEvent( new CustomEvent( "create-todo", {
                bubbles: true,
                detail: {
                    todoDetails: entries
                }
            }));
        })
    }
}

customElements.define("todo-form", TodoForm);
