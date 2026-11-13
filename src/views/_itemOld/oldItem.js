import { getCompletedByDayOfWeek } from "../../utils/date.js";

/*
    An IntentionItem is a custom element that displays a single intention and 
    lets the user interact with it. An Intention holds the data and the 
    IntentionItem defines how that data appears and how the user acts on it.
    In this case, an <intention-item> shows a checkbox, the title, the reason and
    a tag with the associate project or moveTo button if present and the due data

    The item is given an Intention through the intentionData setter, which filles the 
    UI and stores the intention's id. The item never changes the Intention. It only
    displays the information the intention has. When the user does something, it announces
    it with a custom event that carries only the intention's id and new information for the 
    intention like th checked status. The controller handles that information to the 
    IntentionService which finds the real intention and changes it before the page 
    is reRendered. 

    The events bubble up, so the controller can listen for them on a static container
    












An IntentionItem is the on screen version of a single intention object. An intention
    holds the data, and an intention-item defines how that data appears and how the user 
    interacts with it. It shows a checkbox, the title, the reason and a tag with the 
    due date.

    An IntentionItem is given an Intention object through the IntentionData setter. It 
    fills its UI and remembers on the intention's id. It never modifies the intention
    itself. When the user does something, the IntentionItem announces it with the custom
    event that carries the id, so the controller can hand it to the service to find the 
    actual intention and change it in state before the view redraws the UI.

    The events it sends are:
        - move-intention-item: the checkbox was toggled. The event carries the new checked 
          status (true or false) from the checkbox with the it
        - view-intention-item: the intention's text was clicked.

    Both events carries information that identifies the intention, so the controller can hand 
    it to the IntentionService to identify and perform what ever action it needs to perform for
    the state before the IntentionView refreshes the UI.

    Overall, an IntentionItem is a snapshot of the data from an Intention object at the moment it
    was rendered. It does not update itself when the underlying intention object changes. After
    every change in the service, the view clears the list a and creates new IntentionItems from
    the update data, so the UI always reflect the current state.

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
            this.dispatchEvent( new CustomEvent( "move-intention-item", {
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
            this.dispatchEvent( new CustomEvent( "view-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("intention-item-old", IntentionItem);
