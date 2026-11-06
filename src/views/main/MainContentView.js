import { renderAddProjectButton } from "./components/factories/add-project-button.js";
import { renderCollection } from "./components/factories/collection.js";
import { renderHeader } from "./components/factories/header.js";
import { renderSpecificProjectHeader } from "./components/factories/specific-project-header.js";
import { renderSection } from "./components/factories/section.js";
import { renderActiveList, renderCompletedList } from "./components/factories/intention-lists.js";
import { renderCounter } from "./components/factories/counter.js";


class MainContentView {
    #completedElements = [];
    #counterElement;

    constructor(mainContentContainer) {
        this.mainContentContainer = mainContentContainer;
    }

    /* Methods for rendering pages */

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

    renderSpecificProjectPage(projectDetails) {
        this.mainContentContainer.innerHTML = "";

        const section = renderSection();
        section.appendChild(renderSpecificProjectHeader(
            projectDetails.project.projectName,
            projectDetails.project.projectColor
        ))

        const intentionCollection = renderCollection();
        const activeList = this.renderActiveIntentions(
            renderActiveList(),
            projectDetails.activeIntentions,
            projectDetails.project.projectName
        )

        const completedList = this.renderCompletedIntentions(
            renderCompletedList(),
            projectDetails.completedIntentions,
            projectDetails.completedCount,
            projectDetails.project.projectName
        )

        intentionCollection.append(activeList, completedList);
        section.appendChild(intentionCollection)
        this.mainContentContainer.appendChild(section);
    }

    /* Methods for rendering intentions */

    renderActiveIntentions(activeNode, activeIntentions, projectName) {
        activeNode.innerHTML = "";

        activeIntentions.forEach((intention) => {
            const intentionItem = document.createElement("intention-item");
            intentionItem.intentionData = {
                intention,
                projectName: projectName
            }
            activeNode.appendChild(intentionItem)
        });
        return activeNode;
    }

    renderCompletedIntentions(completedNode, completedIntentions, completedCount, projectName) {
        completedNode.innerHTML = "";

        const counter = this.renderCompletedCount(completedCount);

        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedNode.prepend(counter)

        completedIntentions.forEach((intention) => {
            const intentionItem = document.createElement("intention-item");
            intentionItem.intentionData = {
                intention,
                projectName: projectName
            }
            completedNode.appendChild(intentionItem)
            this.#completedElements.push(intentionItem);
        });
        return completedNode;
    }

    /* Methods for rendering components */

    renderCompletedCount(completedCount) {
        /* Remove the existing counter before rendering a new one.
           No counter is rendered when there are no completed intentions. */
        if (this.#counterElement !== undefined) this.#counterElement.remove();
        if (completedCount === 0) return;

        const counter = renderCounter(completedCount);
        this.#counterElement = counter;

        return counter;
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
