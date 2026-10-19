const template = document.createElement("template");
template.innerHTML = `
<div class="task-content">
    <p class="task-title"></p>
    <p class="task-reason">/p>
</div>
`
class TodoItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set todoData(todo) {
        const title = this.shadowRoot.querySelector(".task-title");
        const reason = this.shadowRoot.querySelector(".task-reason");
        title.textContent = todo.title;
        reason.textContent = todo.reason;
    }
}

customElements.define("todo-item", TodoItem);
