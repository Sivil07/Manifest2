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
        title.textContent = todo.title;
        reason.textContent = todo.reason;
    }
}

customElements.define("todo-item", TodoItem);
