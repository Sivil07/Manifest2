import { renderAddProjectButton } from "./components/factories/add-project-button.js";
import { renderCollection } from "./components/factories/collection.js";
import { renderHeader } from "./components/factories/header.js";
import { renderSpecificProjectHeader } from "./components/factories/specific-project-header.js";
import { renderSection } from "./components/factories/section.js";

class MainContentView {
    constructor(mainContentContainer) {
        this.mainContentContainer = mainContentContainer;
    }
    renderProjectsView(projectGroups) {
        this.mainContentContainer.innerHTML = "";
        const projectSection = renderSection();

        projectSection.appendChild(renderHeader("Projects", "Everything you intend."))

        const projectCollection = renderCollection();

        projectGroups.forEach((group) => {
            const projectItem = document.createElement("project-item");
            projectItem.projectData = group;
            projectItem.classList.add("project-item");
            projectCollection.appendChild(projectItem);
        })

        projectSection.appendChild(projectCollection)

        projectSection.appendChild(renderAddProjectButton())
        this.mainContentContainer.appendChild(projectSection);
    }

    // renderSpecificProjectView(projectDetails) {
    //     this.mainContentContainer.innerHTML = "";

    //     const section = renderSection();

    //     section.appendChild(renderSpecificProjectHeader(
    //         projectDetails.project.projectName,
    //         projectDetails.project.projectColor
    //     ))

    //     const collection = renderCollection();

    //     projectDetails.intentions.forEach((intention) => {
    //         const intentionItem = document.createElement("intention-item");
    //         intentionItem.intentionData = {
    //             intention,
    //             projectName: projectDetails.project.projectName
    //         }
    //         collection.appendChild(intentionItem)
    //     });

    //     section.appendChild(collection);
    //     this.mainContentContainer.appendChild(section);
    // }
}

export default MainContentView;
