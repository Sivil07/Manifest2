/* Creates the dialog element that will be used for both the project
   and intention forms. 

   When the user closes the dialog, the dialog will trigger the "close-form"
   event that will be caught by its dedicated view to detect the close action
   and handle removing the dialog form from the dom.
*/

function renderDialog() {
    const dialog = document.createElement("dialog");
    dialog.id = "form-dialog";
    dialog.setAttribute("closedby", "any");

    dialog.addEventListener("close", () => {
        dialog.dispatchEvent(
            new CustomEvent("close-form", {
                bubbles: true
            })
        );
    });

    return dialog;
}

export {
    renderDialog
}
