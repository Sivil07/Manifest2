const template = document.createElement("template");
template.innerHTML = `
<div part="completed-counter">
    <span part="counter">1</span>
    <button type="button" part="clear-todos">Clear Completed</button>
</div> 
`

class TodoCounter extends HTMLElement {
    
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set todoCount({ completedTodoNum }) {
        const counter = this.shadowRoot.querySelector([`[part="counter"]`]);
        counter.textContent = `Completed - ${completedTodoNum}`
    }

    connectedCallback() {
        const clearTodos = this.shadowRoot.querySelector(`[part="clear-todos"]`);
        clearTodos.addEventListener("click", () => {
            this.dispatchEvent(new Event("clear-completed-todos", {
                bubbles: true
            }));
        })
    }
}

customElements.define("todo-counter", TodoCounter);
