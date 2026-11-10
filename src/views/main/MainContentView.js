import { renderAddProjectButton } from "./components/factories/button-actions.js";
import { renderCollection } from "./components/factories/collection.js";
import { renderHeader, renderSpecificProjectHeader } from "./components/factories/header.js";
import { renderSection } from "./components/factories/section.js";
import { buildActiveList, buildCompletedList } from "./components/factories/intention-lists.js";
import { renderCounter } from "./components/factories/counter.js";

class MainContentView {
    #counterElement;
    currentProjectId;

    constructor(mainContentContainer) {
        this.mainContentContainer = mainContentContainer;
    }

    /* Methods for rendering pages */

    renderProjectsPage(projectGroups) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

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

    renderUpcomingPage(intentionDetails) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

        const upcomingSection = renderSection();
        upcomingSection.appendChild(renderHeader("Upcoming"));

        const intentionCollection = renderCollection();
        const activeList = buildActiveList(intentionDetails.transformedActive)
        const completedList = buildCompletedList(intentionDetails.transformedCompleted)
        const counter = this.renderCompletedCount(intentionDetails.completedCount);

        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        intentionCollection.append(activeList, completedList);
        upcomingSection.appendChild(intentionCollection)
        this.mainContentContainer.appendChild(upcomingSection);
    }

    renderInboxPage(intentionDetails) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

        const inboxSection = renderSection();
        inboxSection.appendChild(renderHeader("Inbox"));

        const intentionCollection = renderCollection();
        const activeList = buildActiveList(intentionDetails.transformedActive)
        const completedList = buildCompletedList(intentionDetails.transformedCompleted)
        const counter = this.renderCompletedCount(intentionDetails.completedCount);

        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        intentionCollection.append(activeList, completedList);
        inboxSection.appendChild(intentionCollection)
        this.mainContentContainer.appendChild(inboxSection);
    }

    renderSpecificProjectPage(projectDetails) {
        this.mainContentContainer.innerHTML = "";

        const section = renderSection();
        section.appendChild(renderSpecificProjectHeader(
            projectDetails.project.projectName,
            projectDetails.project.projectColor
        ))

        const intentionCollection = renderCollection();
        const activeList = buildActiveList(projectDetails.transformedActive)
        const completedList = buildCompletedList(projectDetails.transformedCompleted)
        const counter = this.renderCompletedCount(projectDetails.completedCount);

        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        intentionCollection.append(activeList, completedList);
        section.appendChild(intentionCollection)

        this.currentProjectId = projectDetails.project.id;
        this.mainContentContainer.appendChild(section);
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
}

export default MainContentView;
