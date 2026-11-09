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
        document.body.appendChild(intentionTemplate);
    }

    renderProjectForm() {
        if (this.#dialog !== undefined) this.#dialog.remove();

        const projectDialog = renderDialog();
        const projectForm = document.createElement("project-form");
        projectDialog.appendChild(projectForm);
        this.#form = projectForm;
        this.#dialog = projectDialog;
        document.body.appendChild(projectDialog)
        projectDialog.showModal();
    }

    renderIntentionForm() {
        if (this.#dialog !== undefined) this.#dialog.remove();

        const intentionDialog = renderDialog();
        const intentionForm = document.createElement("intention-form");
        intentionDialog.appendChild(intentionForm);
        this.#form = intentionForm;
        this.#dialog = intentionDialog;
        document.body.appendChild(intentionDialog);
        intentionDialog.showModal()
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
}

export default DialogView;
