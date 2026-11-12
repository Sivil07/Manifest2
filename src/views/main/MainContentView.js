import { renderAddProjectButton } from "./components/factories/button-actions.js";
import { renderCollection } from "./components/factories/collection.js";
import { renderHeader, renderSpecificProjectHeader } from "./components/factories/header.js";
import { renderSection } from "./components/factories/section.js";
import { buildActiveList, buildCompletedList } from "./components/factories/intention-lists.js";
import { renderCounter } from "./components/factories/counter.js";
import { getWelcomeDate, getWelcomeMessage } from "../../utils/date.js";
import { buildProgressCard } from "./components/factories/progress.js";
import { renderDeleteProjectButton } from "./components/factories/button-actions.js";


/*  
    MainContentView is the first of three views that render whole sections of the application. 
    It receives a static node from the page called "main-content" and renders everything 
    inside of it. The GlobalController uses the same node to watch for user actions.

    It renders the today, upcoming, inbox, general projects and specific project pages. 
    It assembles each page from factory functions and custom elements. It only draws 
    what it is given. It never reads or changes the application's data.

    currentProjectId records which page is showing. It is undefined for the today, 
    upcoming, inbox and general projects pages because they list intentions 
    from many projects. On a specific project page it holds that project's id. This 
    tells the GlobalController that a specific project page is showing and which 
    one to reRender after a change in state.

    Overall, the MainContentView manages the structure and rendering of the "main-content" 
    section based on the page the user wants to see.
*/
class MainContentView {
    currentProjectId;

    constructor(mainContentContainer) {
        this.mainContentContainer = mainContentContainer;
    }

    /* Methods for rendering pages */

    renderTodayPage(intentionPackage) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

        const todaySection = renderSection("today-page");
        todaySection.appendChild(renderHeader(
            "greeting-header",
            getWelcomeMessage(),
            getWelcomeDate()
        ))

        const progressCard = buildProgressCard(intentionPackage.count, intentionPackage.maxCount);
        todaySection.appendChild(progressCard)
        todaySection.appendChild(renderHeader("today-header", "Today"));

        const intentionCollection = renderCollection("today-collection");
        const activeList = buildActiveList(intentionPackage.transformedActive)
        const completedList = buildCompletedList(intentionPackage.transformedCompleted)

        const counter = this.renderCompletedCount(intentionPackage.completedCount);
        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        const populatedCollection = this.populateIntentionCollection(activeList, completedList, intentionCollection)

        todaySection.appendChild(populatedCollection)

        this.mainContentContainer.appendChild(todaySection);

    }

    renderUpcomingPage(intentionDetails) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

        const upcomingSection = renderSection("upcoming-page");
        upcomingSection.appendChild(renderHeader("upcoming-header", "Upcoming"));

        const intentionCollection = renderCollection("upcoming-collection");
        const activeList = buildActiveList(intentionDetails.transformedActive)
        const completedList = buildCompletedList(intentionDetails.transformedCompleted)

        const counter = this.renderCompletedCount(intentionDetails.completedCount);
        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        const populatedCollection = this.populateIntentionCollection(activeList, completedList, intentionCollection)

        upcomingSection.appendChild(populatedCollection)
        this.mainContentContainer.appendChild(upcomingSection);
    }

    renderInboxPage(intentionDetails) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

        const inboxSection = renderSection("inbox-page");
        inboxSection.appendChild(renderHeader("inbox-header", "Inbox"));

        const intentionCollection = renderCollection("inbox-collection");
        const activeList = buildActiveList(intentionDetails.transformedActive)
        const completedList = buildCompletedList(intentionDetails.transformedCompleted)

        const counter = this.renderCompletedCount(intentionDetails.completedCount);
        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        const populatedCollection = this.populateIntentionCollection(activeList, completedList, intentionCollection)

        inboxSection.appendChild(populatedCollection)
        this.mainContentContainer.appendChild(inboxSection);
    }

    renderProjectsPage(projectGroups) {
        this.mainContentContainer.innerHTML = "";
        this.currentProjectId = undefined;

        const projectSection = renderSection("project-page");
        projectSection.appendChild(renderHeader("projects-header", "Projects", "Everything you intend."))

        const projectCollection = renderCollection("project-collection");

        projectGroups.forEach((group) => {
            const projectItem = document.createElement("project-item");
            projectItem.projectData = group;
            projectItem.classList.add("project-item");
            projectCollection.appendChild(projectItem);
        })

        const populatedCollection = this.populateProjectCollection(projectCollection);

        projectSection.appendChild(populatedCollection)
        projectSection.appendChild(renderAddProjectButton())

        this.mainContentContainer.appendChild(projectSection);
    }

    renderSpecificProjectPage(projectDetails) {
        this.mainContentContainer.innerHTML = "";

        const section = renderSection("specific-project-page");
        section.appendChild(renderSpecificProjectHeader(
            "specific-header",
            projectDetails.project.projectName,
            projectDetails.project.projectColor
        ))

        const intentionCollection = renderCollection("specific-collection");
        const activeList = buildActiveList(projectDetails.transformedActive)
        const completedList = buildCompletedList(projectDetails.transformedCompleted)
        const counter = this.renderCompletedCount(projectDetails.completedCount);

        /* Only display the counter when completed intentions exist. */
        if (counter !== undefined) completedList.prepend(counter);

        const populatedCollection = this.populateIntentionCollection(activeList, completedList, intentionCollection)

        section.appendChild(populatedCollection)
        section.appendChild(renderDeleteProjectButton())

        this.currentProjectId = projectDetails.project.id;
        this.mainContentContainer.appendChild(section);
    }

    /* Methods for rendering components */

    renderCompletedCount(completedCount) {
        /* No counter is rendered when there are no completed intentions. */
        if (completedCount === 0) return;

        const counter = renderCounter(completedCount);
        return counter;
    }

    renderEmptyMessage(message) {
        const emptyMessage = document.createElement("p")
        emptyMessage.classList.add("empty-message")
        emptyMessage.textContent = message;
        return emptyMessage;
    }

    /* Method for assembling collections */

    populateIntentionCollection(activeList, completedList, intentionCollection) {
        const isEmpty = !activeList.hasChildNodes() && !completedList.hasChildNodes();
        if (isEmpty) {
            const emptyMessage = this.renderEmptyMessage("Nothing here yet. Add your first intention with +.")
            intentionCollection.appendChild(emptyMessage)
        }

        intentionCollection.append(activeList, completedList)
        return intentionCollection;
    }

    populateProjectCollection(projectCollection) {
        const isEmpty = !projectCollection.hasChildNodes();
        if (isEmpty) {
            const emptyMessage = this.renderEmptyMessage("Nothing here yet. Add your first project with +.")
            projectCollection.appendChild(emptyMessage)
        }
        return projectCollection;
    }
}

export default MainContentView;
