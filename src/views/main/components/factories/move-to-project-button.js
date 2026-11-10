function renderMoveToProjectButton() {
    const sortButton = document.createElement("button");
    sortButton.setAttribute("part", "sort-button");
    sortButton.type = "button";
    sortButton.textContent = "Sort";

    sortButton.addEventListener("click", () => {
        sortButton.dispatchEvent( new CustomEvent("forward-move-event", {
            bubbles: true
        }))
    });
    return sortButton;

}

export {
    renderMoveToProjectButton
}
