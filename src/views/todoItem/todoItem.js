const template = document.createElement("template");
template.innerHTML = `
<div part="task">
    <label for="complete" part="task-check">
        <input id="complete" type="checkbox" part="complete-todo">
    </label>
    <button type="button" part="task-content">
        <span part="task-title"></span>
        <span part="task-reason"></span>
    </button>
</div>
`
class TodoItem extends HTMLElement {
    #todoId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set todoData(todo) {
        const title = this.shadowRoot.querySelector('[part="task-title"]');
        const reason = this.shadowRoot.querySelector('[part="task-reason"]');
        title.textContent = todo.title;
        reason.textContent = todo.reason;
        this.#todoId = todo.id;

    }

    connectedCallback() {
        const todoInput = this.shadowRoot.querySelector(`[part="complete-todo"]`);
        todoInput.addEventListener("change", (e) => {
            const isChecked = e.target.checked;
            this.dispatchEvent( new CustomEvent( "move-todo-item", {
                bubbles: true,
                detail: {
                    hasBeenChecked: isChecked,
                    todoId: this.#todoId
                }
            }))
        })
        
        const todoContent = this.shadowRoot.querySelector(`[part="task-content"]`);
        todoContent.addEventListener("click", () => {
            this.dispatchEvent( new CustomEvent( "view-todo-item", {
                bubbles: true,
                detail: {
                    id: this.#todoId
                }
            }))
        })
    }
}

customElements.define("todo-item", TodoItem);
