const template = document.createElement("template");
template.innerHTML = `
<button part="template-actions close-todo" type="button">X</button>
<div part="todo-contents">
    <h1 part="title"></h1>
    <p part="reason"></p>
</div>
<div part="button-group">
    <button part="template-actions edit-todo">Edit</button>
    <button part="template-actions delete-todo">Delete</button>
</div>
`

class TodoTemplate extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set templateData(todoData) {
        const title = this.shadowRoot.querySelector(`[part="title"]`);
        const reason = this.shadowRoot.querySelector(`[part="reason"]`);
        const editButton = this.shadowRoot.querySelector(`[part~="edit-todo"]`);
        editButton.dataset.todoId = todoData.id;
        title.textContent = todoData.title;
        reason.textContent = todoData.reason;
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector(`[part~="close-todo"]`);
        closeButton.addEventListener("click", () => {
            this.remove();
        });


        const editButton = this.shadowRoot.querySelector(`[part~="edit-todo"]`);
        editButton.addEventListener("click", (e) => {
            const todoId = e.currentTarget.dataset.todoId;
            this.dispatchEvent( new CustomEvent("edit-todo-item", {
                bubbles: true,
                detail: {
                    id: todoId
                }
            }))
        })
    }
}

customElements.define("todo-template", TodoTemplate);
