function renderMoveToProjectButton() {
    const moveToButton = document.createElement("button");
    moveToButton.setAttribute("part", "move-button tag temp-action");
    moveToButton.type = "button";
    moveToButton.textContent = "Move to...";

    moveToButton.addEventListener("click", () => {
        moveToButton.dispatchEvent( new CustomEvent("forward-move-event", {
            bubbles: true
        }))
    });
    return moveToButton;

}

export {
    renderMoveToProjectButton
}
