const template = document.createElement("template");
template.innerHTML = `
<style>
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
        <input type="text" part="project-name-input" id="project-name-input-link" placeholder="Side Projects" name="project-name">
    </label>
    <div part="project-color-section">
        <p part="project-color-header">Color</p>
        <div part="project-color-options">
            <label for="option-purple" part="project-color-option" class="color-option" style="background-color: #6c35f5">
                <input type="radio" id="option-purple" part="project-color-input" class="color-input" name="project-color" value="purple">
            </label>
            <label for="option-teal" part="project-color-option" class="color-option" style="background-color: #14B8A6">
                <input type="radio" id="option-teal" part="project-color-input" class="color-input" name="project-color" value="teal">
            </label>
            <label for="option-orange" part="project-color-option" class="color-option" style="background-color: #FFA500">
                <input type="radio" id="option-orange" part="project-color-input" class="color-input" name="project-color" value="orange">
            </label>
            <label for="option-pink" part="project-color-option" class="color-option" style="background-color: #FFA500">
                <input type="radio" id="option-pink" part="project-color-input" class="color-input" name="project-color" value="pink">
            </label>
            <label for="option-red" part="project-color-option" class="color-option" style="background-color: #EF4444">
                <input type="radio" id="option-red" part="project-color-input" class="color-input" name="project-color" value="red">
            </label>
            <label for="option-blue" part="project-color-option" class="color-option" style="background-color: #3B82F6">
                <input type="radio" id="option-blue" part="project-color-input" class="color-input" name="project-color" value="blue">
            </label>
        </div>
    </div>
    <div part="form-actions">
        <button type="button" part="form-action">Cancel</button>
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
}

customElements.define("project-form", ProjectForm);
