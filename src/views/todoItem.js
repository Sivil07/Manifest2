const template = document.createElement("template");
template.innerHTML = `
<button type="button" part="task-content">
    <span part="task-title"></span>
    <span part="task-reason"></span>
</button>
`
class TodoItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set todoData(todo) {
        const title = this.shadowRoot.querySelector('[part="task-title"]');
        const reason = this.shadowRoot.querySelector('[part="task-reason"]');
        const todoContent = this.shadowRoot.querySelector(`[part="task-content"]`);
        todoContent.dataset.todoId = todo.id;
        title.textContent = todo.title;
        reason.textContent = todo.reason;
    }

    connectedCallback() {
        const todoContent = this.shadowRoot.querySelector(`[part="task-content"]`);
        todoContent.addEventListener("click", (e) => {
            const todoId = e.currentTarget.dataset.todoId;
            this.dispatchEvent( new CustomEvent( "view-todo-item", {
                bubbles: true,
                detail: {
                    id: todoId
                }
            }))
        })
    }
}

customElements.define("todo-item", TodoItem);
