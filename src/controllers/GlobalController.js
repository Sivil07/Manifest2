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

    #refreshSideBar() {
        this.sideBarView.applyNavCounts(this.intentionService.getActiveCounts);
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
