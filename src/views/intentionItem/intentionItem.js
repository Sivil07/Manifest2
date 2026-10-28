import { getCompletedByDayOfWeek } from "../../utils/date.js";

/*
    A TodoItem is the on screen version of a single Todo object. A todo holds the
    data, and a TodoItem defines how that data appears and how the user interacts with
    it.

    A TodoItem is given a todo object through the todoData setter, fills in its UI (title, reason,
    checked state) and remembers only the todo's id and checked status. It never modifies 
    a todo itself. When something changes in the UI, the id and checked state are passed to the 
    controller and service to identify the actual Todo, so the change can be applied in state
    before the UI is updated.

    When a user does something, the item announces it with a custom event and the controller decides
    what to do. The events include:
        -move-todo-item: the checkbox's state was change (checked or unchecked)
        -view-todo-item: the todo's text was clicked.
    Each event carries information that identifies the todo, so the controller can hand it to the TodoService.
    to identify and perform what ever action it needs to perform for the state before the TodoView 
    refreshes the UI. 

    Overall, a TodoItem is the UI representation of a Todo. It stores the a todo object's id so it can
    identify which Todo object it represents. However, it does not update itself when the underlying Todo
    object changes. A TodoItem is simply a snapshot of the data at the moment it was rendered. After any
    state change in the TodoService, the TodoView clears the lists and create new TodoItems with the updated
    data so the UI reflects the current state.

*/

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
    <div part="todo-tags">
        <span part="tag due-date"></span
    </div>
</div>
`
class IntentionItem extends HTMLElement {
    #intentionId;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set intentionData(intention) {
        const title = this.shadowRoot.querySelector('[part="task-title"]');
        const reason = this.shadowRoot.querySelector('[part="task-reason"]');
        const input = this.shadowRoot.querySelector(`[part="complete-todo"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="due-date"]`);
        const taskContent = this.shadowRoot.querySelector(`[part~="task-content"]`)
        title.textContent = intention.title;
        reason.textContent = intention.reason;
        dueDate.textContent = getCompletedByDayOfWeek(intention.dueDate);
        input.checked = intention.isChecked;
        
        this.#intentionId = intention.id;

        if (intention.isChecked) taskContent.setAttribute("part", "task-content checked")
    }

    connectedCallback() {
        const intentionInput = this.shadowRoot.querySelector(`[part="complete-todo"]`);
        intentionInput.addEventListener("change", (e) => {
            const newCompletedStatus = e.target.checked;
            const intentionPackage = {
                newCompletedStatus: newCompletedStatus,
                intentionId: this.#intentionId,
            }
            this.dispatchEvent( new CustomEvent( "move-todo-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
        
        const intentionContent = this.shadowRoot.querySelector(`[part~="task-content"]`);
        intentionContent.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.#intentionId,
            }
            this.dispatchEvent( new CustomEvent( "view-todo-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("intention-item", IntentionItem);
