const template = document.createElement("template");
template.innerHTML = `
<div part="completed-counter">
    <span part="counter">1</span>
    <button type="button" part="clear-todos">Clear Completed</button>
</div> 
`

class TodoCounter extends HTMLElement {
    #currentFilter;
    
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set todoCount({currentFilter, completedTodoNum}) {
        this.#currentFilter = currentFilter;
        const counter = this.shadowRoot.querySelector([`[part="counter"]`]);
        counter.textContent = `Completed - ${completedTodoNum}`
    }

    connectedCallback() {
        const clearTodos = this.shadowRoot.querySelector(`[part="clear-todos"]`);
        clearTodos.addEventListener("click", () => {
            const todoPackage = {
                currentFilter: this.#currentFilter
            }
            this.dispatchEvent(new CustomEvent("clear-completed-todos", {
                bubbles: true,
                detail: {
                    todoPackage: todoPackage
                }
            }));
        })
    }
}

customElements.define("todo-counter", TodoCounter);
