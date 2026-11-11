class SideBarView {
    constructor(navSectionsContainer, projectListContainer, projectsAddButton, intentionsAddButton) {
        this.navSectionsContainer = navSectionsContainer;
        this.projectListContainer = projectListContainer;
        this.projectsAddButton = projectsAddButton;
        this.intentionsAddButton = intentionsAddButton;
    }

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
