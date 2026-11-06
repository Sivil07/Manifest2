class GlobalController {
    constructor(intentionService, projectService, sideBarView, mainContainerView, dialogView) {
        this.intentionService = intentionService;
        this.projectService = projectService;
        this.sideBarView = sideBarView;
        this.mainContainerView = mainContainerView;
        this.dialogView = dialogView;

        /* Static Nodes */

        const body = this.dialogView.body;
        const mainContainer = this.mainContainerView.mainContentContainer;
        const sideBarAddProjectButton = this.sideBarView.projectsAddButton;
        const sideBarAddIntentionButton = this.sideBarView.intentionsAddButton;
        const navSectionsContainer = this.sideBarView.navSectionsContainer;

        /* Global Events (Form Actions via body) */

        body.addEventListener("open-project-form", () =>{
            this.dialogView.renderProjectForm();
        });

        body.addEventListener("close-form", () => {
            this.dialogView.closeDialog()
        });

        body.addEventListener("save-project", (e) => {
            const projectPackage = e.detail.projectPackage;
            const hasDuplicate = this.projectService.hasDuplicate(projectPackage.projectName);
            if (hasDuplicate) {
                this.dialogView.showError();
                return;
            }

            this.projectService.createProject(projectPackage);
            this.dialogView.closeDialog();
            this.#refreshSideBar();
        });

        /* Main Container Events (interactions via mainContainer) */

        mainContainer.addEventListener("view-project", (e) => {
            const project = this.projectService.getProjectById(e.detail.projectId)
            const activeIntentions = this.intentionService.getIntentionsByProjectIdAndType("active", e.detail.projectId);
            const completedIntentions = this.intentionService.getIntentionsByProjectIdAndType("completed", e.detail.projectId);
            const completedCount = completedIntentions.length;
            const projectDetails = { project, activeIntentions, completedIntentions, completedCount };
            // mainContainerView.renderSpecificProjectView(projectDetails);
        });

        /* Sidebar Events (interactions via static nodes in navBar) */

        sideBarAddProjectButton.addEventListener("click", () => {
            this.dialogView.renderProjectForm();
        })

        sideBarAddIntentionButton.addEventListener("click", () => {
            this.dialogView.renderIntentionForm();
        });

        navSectionsContainer.addEventListener("click", (e) => {
            if (e.target === navSectionsContainer) return;

            const navButton = e.target.closest("button");
            const pageOption = navButton.dataset.action;
            this.#choosePage(pageOption)
        })
    }

    /* Navigation Methods (transitioning to another "page") */

    #choosePage(pageOption) {
        switch (pageOption) {
            case "today":
                break;
            case "upcoming":
                break;
            case "inbox":
                break;
            case "project":
                this.#showProjectsView();
                break;
            default:
        }
    }

    #showProjectsView() {
        const projects = this.#processGroupIntentionsByCounts();
        this.mainContainerView.renderProjectsView(projects);
    }

    /* Some helper methods */
    
    #processGroupIntentionsByCounts() {
        const result = this.projectService.groupIntentionsByProject(this.intentionService.allActiveIntentions);
        return result;
    }

    /* Methods for updating UI after changes made to state */

    #refreshSideBar() {
        this.sideBarView.renderNavCounts(this.intentionService.getActiveCounts);
        this.sideBarView.renderProjectList(this.#processGroupIntentionsByCounts())
    }

    #refreshUI() {

    }

    /* Initialization */

    initialize() {
        this.intentionService.loadIntentions();
        this.projectService.loadProjects();
        this.#refreshSideBar();
        this.#refreshUI();
    }
}


export default GlobalController;
