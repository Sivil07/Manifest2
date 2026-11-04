class GlobalController {
    constructor(intentionService, projectService, sideBarView, mainContainerView, dialogView) {
        this.intentionService = intentionService;
        this.projectService = projectService;
        this.sideBarView = sideBarView;
        this.mainContainerView = mainContainerView;
        this.dialogView = dialogView;

        const body = this.dialogView.body;
        body.addEventListener("open-project-form", () =>{
            this.dialogView.renderProjectForm();
        });

        body.addEventListener("close-form", () => {
            this.dialogView.closeDialog()
        });

        body.addEventListener("save-project", (e) => {
            const projectPackage = e.detail.projectPackage;
            const hasDuplicate = this.projectService.hasDuplicate(projectPackage["project-name"]);
            if (hasDuplicate) {
                this.dialogView.showError();
                return;
            }

        });

        const sideBarAddProjectButton = this.sideBarView.projectsAddButton;
        sideBarAddProjectButton.addEventListener("click", () => {
            this.dialogView.renderProjectForm();
        })

        const sideBarAddIntentionButton = this.sideBarView.intentionsAddButton;
        sideBarAddIntentionButton.addEventListener("click", () => {
            this.dialogView.renderIntentionForm();
        });

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
