import { renderProjectOption } from "../factories/move-options.js";


const template = document.createElement("template");
template.innerHTML = `
<style>
    .highlight-label:has(.highlight-radio:focus) {
        background-color: var(--clr-lavender);
    }
    
    .highlight-label:has(.highlight-radio:checked) {
        background-color: var(--clr-lavender);
    } 
</style>


<form part="move-to-form">
    <div part="move-to-header">
        <h2 part="title">Move To...</h2>
        <p part="subtitle">Choose a project for this intention</p>
    </div>
    <div part="project-options">

    </div>
    <div part="move-form-actions">
        <button type="button" part="move-action cancel-move">Cancel</button>
        <button type="submit" part="move-action submit-move">Move</button>
    </div>
`

// <label for="radio-1" part="project-option" class="highlight-label">
//     <div part="project-option-info">
//         <div part="project-color"></div>
//         Inbox
//         <input type="radio" id="radio-1" part="project-radio" class="highlight-radio" name="projectId" value="projectColor">
//     </div>
//     <p part="project-status">Current</p>
// </label>
// <label for="radio-2" part="project-option" class="highlight-label">
//     <div part="project-option-info">
//         <div part="project-color"></div>
//         Work
//         <input type="radio" id="radio-2" part="project-radio" class="highlight-radio" name="projectId" value="projectColor">
//     </div>
//     <p part="project-status"></p>
// </label>
// <label for="radio-3" part="project-option" class="highlight-label">
//     <div part="project-option-info">
//         <div part="project-color"></div>
//         Home
//         <input type="radio" id="radio-3" part="project-radio" class="highlight-radio" name="projectId" value="projectColor">
//     </div>
//     <p part="project-status"></p>
// </label>

// <form action="" class="move-to-form">
//     <div class="form-header">
//         <h2 class="title">Move To...</h2>
//         <p class="subtitle">Choose a project for this intention</p>
//     </div>
//     <div class="radio-groups">
//         <label for="radio-1" class="input-radio">
//             <div class="intention-info">
//                 <div class="color"></div>
//                 Inbox
//                 <input type="radio" id="radio-1" class="my-radio" name="projectId" value="projectColor">
//             </div>
//             <p class="selected">Current</p>
//         </label>
//         <label for="radio-2" class="input-radio">
//             <div class="intention-info">
//                 <div class="color"></div>
//                 Work
//                 <input type="radio" id="radio-2" class="my-radio" name="projectId" value="projectColor">
//             </div>
//             <p class="selected"></p>
//         </label>
//         <label for="radio-3" class="input-radio">
//             <div class="intention-info">
//                 <div class="color"></div>
//                 Home
//                 <input type="radio" id="radio-3" class="my-radio" name="projectId" value="projectColor">
//             </div>
//             <p class="selected"></p>
//         </label>
//     </div>
//     <div class="form-actions">
//         <button type="button" class="action cancel-move">Cancel</button>
//         <button type="submit" class="action submit-move">Move</button>
//     </div>

class MoveToForm extends HTMLElement {
    #intentionId; 
    #isTemplateOpen;
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set formData(data) {
        const projectOptions = this.shadowRoot.querySelector(`[part="project-options"]`);

        const projects = data.projectOptions;
        const intention = data.intention;

        let projectCount = 1;
        const inboxOption = this.createInboxOption(intention.projectId, projectCount);
        projectCount++

        projectOptions.appendChild(inboxOption)
        projects.forEach((project) => {
            const { projectId, projectName, projectColor, } = project;
            const projectOption = renderProjectOption(projectId, intention.projectId, projectName, projectColor, projectCount)
            projectOptions.appendChild(projectOption)
            projectCount++
        });

        this.#isTemplateOpen = data.isTemplateOpen
        this.#intentionId = intention.id
    }

    createInboxOption(intentionProjectId, projectCount) {
        const projectId = "";
        const projectName = "Inbox";
        const projectColor = "#808080";
        const inboxOption = renderProjectOption(projectId, intentionProjectId, projectName, projectColor, projectCount);
        return inboxOption;
    }

    connectedCallback() {
        const moveToForm = this.shadowRoot.querySelector(`[part="move-to-form"]`);
        moveToForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(moveToForm);
            const entries = Object.fromEntries(data.entries());
            const intentionPackage = { 
                isTemplateOpen: this.#isTemplateOpen,
                intentionId: this.#intentionId, 
                ...entries 
            }
            this.dispatchEvent( new CustomEvent("update-intention-project", {
                bubbles: true,
                detail: {
                    intentionPackage: intentionPackage
                }
            }))
        })
    }
}

customElements.define("move-to-form", MoveToForm);
