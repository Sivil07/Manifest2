/*  Creates container nodes for displaying active and completed 
    intentions.

    These containers act as mounting points where <intention-items>
    are rendered within their respective sections.
*/

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

function buildCompletedList(completedIntentions) {
    const completedNode = renderCompletedList();

    completedIntentions.forEach((intentionBlock) => {
        const intentionItem = document.createElement("intention-item");
        intentionItem.intentionData = {
            intention: intentionBlock.intention,
            projectName: intentionBlock.projectName
        }
        completedNode.appendChild(intentionItem)
    });
    return completedNode;
}

export {
    buildActiveList,
    buildCompletedList
}
