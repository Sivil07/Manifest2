function renderMoveToProjectButton() {
    const sortButton = document.createElement("button");
    sortButton.setAttribute("part", "sort-button");
    sortButton.type = "button";
    sortButton.textContent = "Sort";
    return sortButton;

}

export {
    renderMoveToProjectButton
}
