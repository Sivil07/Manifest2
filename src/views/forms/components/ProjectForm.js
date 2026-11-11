const template = document.createElement("template");
template.innerHTML = `
<style>
    input[type="radio"] {
        appearance: none;
    }

    .color-option:has(.color-input:focus)::after {
        content: "";
        position: absolute;
        border: 1px solid black;
        width: 100%;
        aspect-ratio: 1;
        border-radius: 50%;
        inset: 0;
        transform: scale(1.15);
    }
</style>

<form part="project-form-contents">
    <h2 part="form-header">New Project</h2>
    <label for="project-name-input-link" part="project-name-label">
        Project name
        <p part="form-error" hidden>A project with this name already exists.</p>
        <input type="text" part="project-name-input" id="project-name-input-link" placeholder="Side Projects" name="projectName" required>
    </label>
    <div part="project-color-section">
        <p part="project-color-header">Color</p>
        <div part="project-color-options">
            <label for="option-purple" part="project-color-option" class="color-option" style="background-color: #6c35f5">
                <input type="radio" id="option-purple" part="project-color-input" class="color-input" name="projectColor" value="#6c35f5" required>
            </label>
            <label for="option-teal" part="project-color-option" class="color-option" style="background-color: #14B8A6">
                <input type="radio" id="option-teal" part="project-color-input" class="color-input" name="projectColor" value="#14B8A6">
            </label>
            <label for="option-orange" part="project-color-option" class="color-option" style="background-color: #FFA500">
                <input type="radio" id="option-orange" part="project-color-input" class="color-input" name="projectColor" value="#FFA500">
            </label>
            <label for="option-pink" part="project-color-option" class="color-option" style="background-color: #FFC0CB">
                <input type="radio" id="option-pink" part="project-color-input" class="color-input" name="projectColor" value="#FFC0CB">
            </label>
            <label for="option-red" part="project-color-option" class="color-option" style="background-color: #EF4444">
                <input type="radio" id="option-red" part="project-color-input" class="color-input" name="projectColor" value="#EF4444">
            </label>
            <label for="option-blue" part="project-color-option" class="color-option" style="background-color: #3B82F6">
                <input type="radio" id="option-blue" part="project-color-input" class="color-input" name="projectColor" value="#3B82F6">
            </label>
        </div>
    </div>
    <div part="form-actions">
        <button type="button" part="form-action cancel-project">Cancel</button>
        <button type="submit" part="form-action submit-new-project">Create Project</button>
    </div>
</form>
`

class ProjectForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    showError() {
        const formError = this.shadowRoot.querySelector(`[part="form-error"]`);
        const nameInput = this.shadowRoot.querySelector(`[part="project-name-input"]`);
        formError.hidden = false;
        nameInput.value = "";
    }

    connectedCallback() {
        const cancelButton = this.shadowRoot.querySelector(`[part~="cancel-project"]`);
        cancelButton.addEventListener("click", () => {
            this.dispatchEvent(
                new CustomEvent("close-form", {
                    bubbles: true
                })
            )
        })

        const projectForm = this.shadowRoot.querySelector(`[part="project-form-contents"]`);
        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(projectForm);
            const entries = Object.fromEntries(data.entries());
            this.dispatchEvent( new CustomEvent("save-project", {
                    bubbles: true,
                    detail: {
                        projectPackage: entries
                    }
                })
            )
        });
    }
}

customElements.define("project-form", ProjectForm);
