/* Creates a completed intentions counter component

   Accepts the number of completed intentions and displays
   the value alongside a button to clear the completed intentions.

   Used in the dynamic completed-intentions list node to show how many
   intentions have been completed and provide an action for clearing 
   them.
*/

function renderCounter(count) {
    const completedCounter = document.createElement("div");
    completedCounter.classList.add("completed-counter");

    const counter = document.createElement("p");
    counter.textContent = count;

    const clearIntentions = document.createElement("button");
    clearIntentions.classList.add("clear-intentions")
    clearIntentions.textContent = "Clear Completed"
    clearIntentions.type = "button";

    completedCounter.append(counter, clearIntentions);
    return completedCounter
}

export {
    renderCounter
}
