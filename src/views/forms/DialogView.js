import { renderDialog } from "./factories/dialog.js";

/*  
    DialogView is the third of three views that render whole sections of the application. 
    Unlike the other two, it is not given a static node by the page. It uses document.body 
    as its container and layers overlays on top of the page instead of rendering inside one 
    fixed section. The overlays are the project, intention and move forms, each nested inside
    a factory dialog component, and the intention template, which shows one intention.

    Only one dialog is open at a time. Opening a new form replaces the current one. The intention 
    template is tracked separately, so it can stay open while a dialog is shown on top of it. 
    The view keeps a private reference to the current dialog, form and template so it can close them.

    It also passes errors to the opened form using "showError", which only works for forms that 
    have a showError method, such as the ProjectForm and IntentionForm. This way the GlobalController 
    never touches the form elements directly.

    The view only draws and removes overlays. It never reads or changes the application's data. 
    Deciding what happens to submitted form data is the GlobalController's job.

    Overall, the DialogView manages which overlay is on screen and cleans it up when it is no 
    longer needed.
*/

class DialogView {
    #dialog;
    #form;
    #template;

    constructor() {
        this.body = document.body
    }

    /* Methods for rendering components */

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

    renderIntentionForm(intentionData = {}) {
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

    /*  Methods for closing and managing overlays  */

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

    /* Methods for handling form feedback */

    showError() {
        this.#form.showError()
    }

}

export default DialogView;
