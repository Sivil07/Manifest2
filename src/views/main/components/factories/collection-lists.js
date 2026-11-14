/*  Creates container nodes for displaying active and completed 
    intentions.

    These containers act as mounting points where <intention-items>
    are rendered within their respective sections.
*/

function renderCollection(className) {
    const collection = document.createElement("div");
    collection.classList.add(className);
    return collection;
}

function renderActiveList() {
    const activeList = document.createElement("div");
    activeList.classList.add("active-list");
    return activeList;
}

function renderCompletedList() {
    const completedList = document.createElement("div");
    completedList.classList.add("completed-list");
    return completedList;
}

/* Creates an active intention list populated with IntentionItem components. */
function buildActiveList(activeIntentions) {
    const activeNode = renderActiveList();
    activeIntentions.forEach((intentionBlock) => {
        const intentionItem = document.createElement("intention-item");
        intentionItem.intentionData = {
            intention: intentionBlock.intention,
            projectName: intentionBlock.projectName
        }
        activeNode.appendChild(intentionItem)
    });
    return activeNode;
}

/* Creates a completed intention list populated with IntentionItem components. */
function buildCompletedList(completedIntentions) {
    const completedNode = renderCompletedList();

    completedIntentions.forEach((intentionBlock) => {
        const intentionItem = document.createElement("intention-item");
        intentionItem.intentionData = {
            intention: intentionBlock.intention,
            projectName: intentionBlock.projectName
        }
        intentionItem.classList.add("transparent")
        completedNode.appendChild(intentionItem)
    });
    return completedNode;
}

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
    counter.classList.add("counter");
    counter.textContent = `Completed - ${count}`

    const clearIntentions = document.createElement("button");
    clearIntentions.classList.add("clear-intentions")
    clearIntentions.textContent = "Clear completed"
    clearIntentions.type = "button";

    completedCounter.append(counter, clearIntentions);

    clearIntentions.addEventListener("click", () => {
        clearIntentions.dispatchEvent(
            new CustomEvent( "clear-completed-intentions", {
                bubbles: true
            })
        )
    })
    return completedCounter
}

export {
    buildActiveList,
    buildCompletedList,
    renderCollection,
    renderCounter
}
