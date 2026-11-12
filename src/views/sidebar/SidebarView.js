/*
    SidebarView is the second of three views that render whole sections of the application. 
    It receives static nodes from the page and renders the parts of the sidebar that 
    change with the data. This includes the counts on the nav buttons and the list of projects.

    The nav buttons themselves are written in the HTML file and never reRendered. This 
    view only updates the number of active intentions for the today, upcoming and inbox 
    pages and the number of projects (renderNavCounts), and rebuilds the project list 
    (renderProjectList) from the data it is given. It never reads or changes the application's
    data.

    The view also receives two add buttons (projectsAddButton and intentionsAddButton). 
    It does not use them itself. It holds them so the GlobalController can watch 
    them for clicks to open either the IntentionForm for intentions or the ProjectForm 
    for projects.

    Overall, the SidebarView keeps the sidebar's counts and project list in sync with the 
    latest data changes while managing the structure and rendering of the static 
    dom nodes passed to it.
*/

class SideBarView {
    constructor(navSectionsContainer, projectListContainer, projectsAddButton, intentionsAddButton) {
        this.navSectionsContainer = navSectionsContainer;
        this.projectListContainer = projectListContainer;
        this.projectsAddButton = projectsAddButton;
        this.intentionsAddButton = intentionsAddButton;
    }

    /* Methods for rendering statistics */

    /* Updates the the nav button counts so the UI reflects the 
       latest active intention counts for today, upcoming, inbox.
       It also displays the number of projects a user has.  */
    renderNavCounts({ todayCount, upcomingCount, inboxCount, projectCount }) {
        const todayElement = this.navSectionsContainer.querySelector(`[data-count="today-count"]`);
        const upcomingElement = this.navSectionsContainer.querySelector(`[data-count="upcoming-count"]`);
        const inboxElement = this.navSectionsContainer.querySelector(`[data-count="inbox-count"]`);
        const projectElement = this.navSectionsContainer.querySelector(`[data-count="project-count"]`)
        todayElement.textContent = todayCount;
        upcomingElement.textContent = upcomingCount;
        inboxElement.textContent = inboxCount;
        projectElement.textContent = projectCount
    }

    /* Methods for rendering components */

    /* Renders the list of projects within the sidebar.
       Clears the current project list container and then creates a 
       ProjectItem component for each grouped project and inserts it 
       into the project-list

       Each ProjectItem is given its project data so it can display
       the project name and its number of active intentions.
    */
    renderProjectList(projectGroups) {
        this.projectListContainer.innerHTML = "";
        projectGroups.forEach((group) => {
            const projectLink = document.createElement("project-link");
            projectLink.projectData = group;
            projectLink.classList.add("project-contents")
            this.projectListContainer.appendChild(projectLink)
        })  
    }
}

export default SideBarView;
