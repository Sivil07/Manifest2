class SideBarView {
    constructor(navSectionsContainer) {
        this.navSectionsContainer = navSectionsContainer;
    }

    /* Updates the the nav button counts so the UI reflects the 
       latest active intention counts for today, upcoming and inbox  */
    applyNavCounts({ todayCount, upcomingCount, inboxCount }) {
        const todayElement = this.navSectionsContainer.querySelector(`[data-count="today-count"]`);
        const upcomingElement = this.navSectionsContainer.querySelector(`[data-count="upcoming-count"]`);
        const inboxElement = this.navSectionsContainer.querySelector(`[data-count="inbox-count"]`);
        todayElement.textContent = todayCount;
        upcomingElement.textContent = upcomingCount;
        inboxElement.textContent = inboxCount;
    }
}

export default SideBarView;
