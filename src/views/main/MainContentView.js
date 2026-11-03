import { renderAddProjectButton } from "./components/factories/add-project-button.js";
import { renderProjectCollection } from "./components/factories/project-collection.js";
import { renderHeader } from "./components/factories/project-header.js";

class MainContentView {
    constructor(mainContentContainer) {
        this.mainContentContainer = mainContentContainer;
    }
    
    renderProjects(projectGroups) {
        this.mainContentContainer.innerHTML = "";
        this.mainContentContainer.appendChild( renderHeader() )

        const projectCollection = renderProjectCollection();

        projectGroups.forEach((group) => {
            const projectItem = document.createElement("project-item");
            projectItem.projectData = group;
            projectItem.classList.add("project-item");
            projectCollection.appendChild(projectItem);
        })
        this.mainContentContainer.appendChild(projectCollection);

        this.mainContentContainer.appendChild(renderAddProjectButton());
    }
}

export default MainContentView;
