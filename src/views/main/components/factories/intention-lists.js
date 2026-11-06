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

export {
    renderActiveList,
    renderCompletedList 
}
