class SideBarView {
    constructor(navSectionsContainer, projectListContainer) {
        this.navSectionsContainer = navSectionsContainer;
        this.projectListContainer = projectListContainer;
    }

    /* Updates the the nav button counts so the UI reflects the 
       latest active intention counts for today, upcoming and inbox  */
    renderNavCounts({ todayCount, upcomingCount, inboxCount }) {
        const todayElement = this.navSectionsContainer.querySelector(`[data-count="today-count"]`);
        const upcomingElement = this.navSectionsContainer.querySelector(`[data-count="upcoming-count"]`);
        const inboxElement = this.navSectionsContainer.querySelector(`[data-count="inbox-count"]`);
        todayElement.textContent = todayCount;
        upcomingElement.textContent = upcomingCount;
        inboxElement.textContent = inboxCount;
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
            const projectItem = document.createElement("project-item");
            projectItem.projectData = group;
            projectItem.classList.add("project-contents")
            this.projectListContainer.appendChild(projectItem)
        })  
    }
}

export default SideBarView;
