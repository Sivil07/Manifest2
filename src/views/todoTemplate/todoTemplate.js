const template = document.createElement("template");
template.innerHTML = `
<button part="template-actions close-todo" type="button">X</button>
<div part="template-contents">
    <h1 part="template-title"></h1>
    <p part="template-reason"></p>
</div>
<div part="button-group">
    <button part="template-actions edit-todo">Edit</button>
    <button part="template-actions delete-todo">Delete</button>
</div>
`

class TodoTemplate extends HTMLElement {
    #todoId;
    #todoChecked;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set templateData(todoData) {
        const title = this.shadowRoot.querySelector(`[part="template-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="template-reason"]`);
        title.textContent = todoData.title;
        reason.textContent = todoData.reason;
        this.#todoId = todoData.id;
        this.#todoChecked = todoData.isChecked;
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector(`[part~="close-todo"]`);
        closeButton.addEventListener("click", () => {
            this.remove();
        });


        const deleteButton = this.shadowRoot.querySelector(`[part~="delete-todo"]`);
        deleteButton.addEventListener("click", () => {
            this.dispatchEvent( new CustomEvent( "delete-todo-item", {
                bubbles: true,
                detail: {
                    id: this.#todoId,
                    todoChecked: this.#todoChecked
                }
            }))
        });

        const editButton = this.shadowRoot.querySelector(`[part~="edit-todo"]`);
        editButton.addEventListener("click", () => {
            this.dispatchEvent( new CustomEvent("edit-todo-item", {
                bubbles: true,
                detail: {
                    id: this.#todoId,
                    todoChecked: this.#todoChecked
                }
            }))
        })
    }
}

customElements.define("todo-template", TodoTemplate);
