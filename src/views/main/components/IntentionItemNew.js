import { renderMoveToProjectButton } from "./factories/button-actions.js";

const template = document.createElement("template");
template.innerHTML = `
<div part="intention-contents">
    <label for="intention-check" part="intention-label">
        <input id="intention-check" type="checkbox" part="input-check">
    </label>
    <button type="button" part="intention-text">
        <p part="intention-title">Commit Project</p>
        <p part="intention-reason">I want To Be Able To fly</p>
    </button>
    <div part="intention-tags">
        <p part="tag project-name"></p>
        <p part="tag due-date">Fri - Nov 3rd</p>
    </div>
</div>
`

class IntentionItemNew extends HTMLElement {
    #intentionId;
    #intentionProjectId
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set intentionData(data) {
        const title = this.shadowRoot.querySelector(`[part="intention-title"]`);
        const reason = this.shadowRoot.querySelector(`[part="intention-reason"]`);
        const dueDate = this.shadowRoot.querySelector(`[part~="due-date"]`);
        const checkBox = this.shadowRoot.querySelector(`[part="input-check"]`);
        const projectName = this.shadowRoot.querySelector(`[part~="project-name"]`);

        title.textContent = data.intention.title;
        reason.textContent = data.intention.reason;
        dueDate.textContent = data.intention.dueDate;
        checkBox.checked = data.intention.isChecked;
        projectName.textContent = data.projectName;
        // console.log(data.projectName)


        const hasProjectName = (data.projectName !== "");
        // console.log(hasProjectName)
        this.#updateProjectTag(hasProjectName, projectName, data.projectName)
        

        this.#intentionId = data.intention.id;
        this.#intentionProjectId = data.intention.projectId
    }

    #updateProjectTag(hasProjectName, projectElement, projectName) {
        if (!hasProjectName) {
            const intentionTags = this.shadowRoot.querySelector(`[part="intention-tags"]`);
            const moveToButton = renderMoveToProjectButton();
            projectElement.remove();
            intentionTags.prepend(moveToButton)
            return;
        }

        projectElement.textContent = projectName;
    }

    connectedCallback() {
        const checkBox = this.shadowRoot.querySelector(`[part="input-check"]`);
        const intentionTextButton = this.shadowRoot.querySelector(`[part="intention-text"]`);
        const intentionTags = this.shadowRoot.querySelector(`[part="intention-tags"]`);

        checkBox.addEventListener("change", (e) => {
            const newCompletedStatus = e.target.checked;
            const intentionPackage = {
                newCompletedStatus: newCompletedStatus,
                intentionId: this.#intentionId,
                projectId: this.#intentionProjectId
            }
            this.dispatchEvent(new CustomEvent("move-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        });

        intentionTextButton.addEventListener("click", () => {
            const intentionPackage = {
                intentionId: this.#intentionId,
                projectId: this.#intentionProjectId
            }
            this.dispatchEvent(new CustomEvent("view-intention-item", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })

        intentionTags.addEventListener("forward-move-event", () => {
            const intentionPackage = {
                intentionId: this.#intentionId
            }
            this.dispatchEvent( new CustomEvent("open-move-form", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("intention-item", IntentionItemNew);
