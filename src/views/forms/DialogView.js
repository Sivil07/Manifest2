import { renderDialog } from "./factories/dialog.js";

class DialogView {
    #dialog;

    constructor() {
        this.body = document.body
    }

    renderProjectForm() {
        if (this.#dialog !== undefined) this.#dialog.remove();

        const projectDialog = renderDialog();
        const projectForm = document.createElement("project-form");
        projectDialog.appendChild(projectForm);
        this.#dialog = projectDialog;
        document.body.appendChild(projectDialog)
        projectDialog.showModal();
    }

    closeDialog() {
        this.#dialog.close()
        this.#dialog.remove();
    }
}

export default DialogView;
