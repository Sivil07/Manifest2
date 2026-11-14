/* Creates a Move To button that forwards move requests to its parent component. */

function renderMoveToProjectButton() {
    const moveToButton = document.createElement("button");
    moveToButton.setAttribute("part", "move-button tag temp-action");
    moveToButton.type = "button";
    moveToButton.textContent = "Move to...";

    moveToButton.addEventListener("click", () => {
        moveToButton.dispatchEvent(new CustomEvent("forward-move-event", {
            bubbles: true
        }))
    });
    return moveToButton;
}

/* Creates the "+ New Project" button used within the project display.
   
   When the button is clicked the "open-project-form" event will
   bubble upward. 
   
   The dialog will be managed at the body level rather than the main content 
   since it will be inserted as a child of the body. A new view will be added
   to handle this so the bubbling will ensure that the new view will catch
   the event. 
*/

function renderAddProjectButton() {
    const addProject = document.createElement("button");
    addProject.classList.add("add-project")
    addProject.type = "button";
    addProject.textContent = "+ New Project";

    addProject.addEventListener("click", () => {
        addProject.dispatchEvent(
            new CustomEvent("open-project-form", {
                bubbles: true
            })
        )
    });

    return addProject;
}

/* Creates a Delete Project button that dispatches delete-project when clicked. */
function renderDeleteProjectButton() {
    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project");
    deleteProjectButton.type = "button";
    deleteProjectButton.textContent = "Delete Project";

    deleteProjectButton.addEventListener("click", () => {
        deleteProjectButton.dispatchEvent(
            new CustomEvent("delete-project", {
                bubbles: true
            })
        )
    })
    
    return deleteProjectButton


}
export {
    renderMoveToProjectButton,
    renderAddProjectButton,
    renderDeleteProjectButton
}
