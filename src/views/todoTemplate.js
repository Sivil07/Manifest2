const template = document.createElement("template");
template.innerHTML = `
<button part="template-actions close-todo" type="button">X</button>
<div part="todo-contents">
    <h1 part="title"></h1>
    <p part="reason"></p>
</div>
<button part="template-actions">Edit</button>

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
        title.textContent = todoData.title;
        reason.textContent = todoData.reason;
    }

}

customElements.define("todo-template", TodoTemplate);
