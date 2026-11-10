import { renderDialog } from "./factories/dialog.js";

class DialogView {
    #dialog;
    #form;
    #template;

    constructor() {
        this.body = document.body
    }

    showError() {
        this.#form.showError()
    }

    renderIntentionTemplate(templateDetails) {
        const intentionTemplate = document.createElement("intention-template");
        intentionTemplate.classList.add("intention-template");
        intentionTemplate.templateData = {
            projectName: templateDetails.projectName,
            intention: templateDetails.intention
        }
        this.#template = intentionTemplate;
        this.body.appendChild(intentionTemplate);
    }

    renderProjectForm() {
        if (this.#dialog !== undefined) this.#dialog.remove();

        const projectDialog = renderDialog();
        const projectForm = document.createElement("project-form");
        projectDialog.appendChild(projectForm);
        this.#form = projectForm;
        this.#dialog = projectDialog;
        this.body.appendChild(projectDialog)
        projectDialog.showModal();
    }

    renderIntentionForm( intentionData = {} ) {
        if (this.#dialog !== undefined) this.#dialog.remove();

        const intentionDialog = renderDialog();
        const intentionForm = document.createElement("intention-form");
        intentionForm.formData = intentionData
        intentionDialog.appendChild(intentionForm);
        this.#form = intentionForm;
        this.#dialog = intentionDialog;
        this.body.appendChild(intentionDialog);
        intentionDialog.showModal()
    }

    renderMoveForm(formPackage) {
        if (this.#dialog !== undefined) this.#dialog.remove();

        const moveDialog = renderDialog();
        const moveForm = document.createElement("move-to-form");
        moveForm.formData = formPackage;
        moveDialog.appendChild(moveForm)
        this.#form = moveForm;
        this.#dialog = moveDialog;
        this.body.appendChild(moveDialog);
        moveDialog.showModal()
    }

    closeTemplate() {
        this.#template.remove()
        this.#template = undefined;
    }

    closeDialog() {
        this.#dialog.close()
        this.#dialog.remove();
        this.#form = undefined;
    }

    closeOverlays() {
        this.closeTemplate()
        this.closeDialog()
    }
}

export default DialogView;
