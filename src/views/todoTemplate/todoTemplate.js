import { getCompletedByDayOfWeek } from "../../utils/date.js";

const template = document.createElement("template");
template.innerHTML = `
<div part="template-contents">
    <div part="template-tags">
        <span part="template-due-date"></span>
    </div>
    <div part="template-display">
        <h1 part="template-title"></h1>
        <p part="template-reason"></p>
    </div>
    <div part="button-group">
        <button part="template-actions edit-todo">Edit</button>
        <button part="template-actions delete-todo">Delete</button>
    </div>
</div>
<div part="close-container">
    <button part="template-actions close-template">X</button>
</div>
`

class TodoTemplate extends HTMLElement {
    #todoId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set templateData(todoData) {
        const title = this.shadowRoot.querySelector(`[part="template-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="template-reason"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="template-due-date"]`);
        title.textContent = todoData.title;
        reason.textContent = todoData.reason;
        dueDate.textContent = getCompletedByDayOfWeek(todoData.dueDate);
        this.#todoId = todoData.id;
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector(`[part~="close-template"]`);
        closeButton.addEventListener("click", () => {
            this.remove();
        });


        const deleteButton = this.shadowRoot.querySelector(`[part~="delete-todo"]`);
        deleteButton.addEventListener("click", () => {
            const todoPackage = {
                todoId: this.#todoId,
            }
            this.dispatchEvent( new CustomEvent( "delete-todo-item", {
                bubbles: true,
                detail: {
                    todoPackage: todoPackage
                }
            }))
        });

        const editButton = this.shadowRoot.querySelector(`[part~="edit-todo"]`);
        editButton.addEventListener("click", () => {
            const todoPackage = {
                todoId: this.#todoId,
            }
            this.dispatchEvent( new CustomEvent("edit-todo-item", {
                bubbles: true,
                detail: {
                    todoPackage: todoPackage
                }
            }))
        })
    }
}

customElements.define("todo-template", TodoTemplate);
