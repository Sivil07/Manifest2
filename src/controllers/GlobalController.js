class GlobalController {
    constructor(intentionService, projectService, sideBarView, mainContainerView) {
        this.intentionService = intentionService;
        this.projectService = projectService;
        this.sideBarView = sideBarView;
        this.mainContainerView = mainContainerView;

        const navSectionsContainer = this.sideBarView.navSectionsContainer;

        navSectionsContainer.addEventListener("click", (e) => {
            if (e.target === navSectionsContainer) return;

            const navButton = e.target.closest("button");
            const displayOption = navButton.dataset.action;
            this.#chooseDisplay(displayOption)
        })
    }

    #chooseDisplay(displayOption) {
        switch (displayOption) {
            case "today":
                break;
            case "upcoming":
                break;
            case "inbox":
                break;
            case "project":
                this.#showProjectDisplay();
                break;
            default:
        }
    }

    #showProjectDisplay() {
        const projects = this.#processGroupIntentionsByCounts();
        this.mainContainerView.renderProjects(projects);
    }

    #processGroupIntentionsByCounts() {
        const result = this.projectService.groupIntentionsByProject(this.intentionService.allActiveIntentions);
        return result;
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
