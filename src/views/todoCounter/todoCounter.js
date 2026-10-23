const template = document.createElement("template");
template.innerHTML = `
<div part="completed-counter">
    <span part="counter">1</span>
    <button part="clear-todos">Clear Completed</button>
</div> 
`

class TodoCounter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }
}

customElements.define("todo-counter", TodoCounter);
