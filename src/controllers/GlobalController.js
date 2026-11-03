class GlobalController {
    constructor(intentionService, projectService, sideBarView,) {
        this.intentionService = intentionService;
        this.projectService = projectService;
        this.sideBarView = sideBarView;

        const navSectionsContainer = this.sideBarView.navSectionsContainer;

        navSectionsContainer.addEventListener("click", (e) => {
            const element = e.target;
            console.log(element)
        })

    }

    #processGroupIntentionsByCounts() {
        const result = this.projectService.groupIntentionsByProject(this.intentionService.allActiveIntentions);
        return result
    }

    #refreshSideBar() {
        this.sideBarView.renderNavCounts(this.intentionService.getActiveCounts);
        this.sideBarView.renderProjectList(this.#processGroupIntentionsByCounts())
    }

    #refreshUI() {
        
    }

    initialize() {
        this.intentionService.loadIntentions();
        this.projectService.loadProjects();
        this.#refreshSideBar();
        this.#refreshUI();
    }
}


export default GlobalController;
