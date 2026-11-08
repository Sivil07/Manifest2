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

        body.addEventListener("open-project-form", () => {
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

        body.addEventListener("view-project", (e) => {
            const activeIntentions = this.intentionService.getIntentionsByProjectIdAndType("active", e.detail.projectId);
            const completedIntentions = this.intentionService.getIntentionsByProjectIdAndType("completed", e.detail.projectId);

            const project = this.projectService.getProjectById(e.detail.projectId);
            const transformedActive = this.projectService.transformIntentionList(activeIntentions)
            const transformedCompleted = this.projectService.transformIntentionList(completedIntentions)
            const completedCount = transformedCompleted.length;
            const projectDetails = { project, transformedActive, transformedCompleted, completedCount };
            mainContainerView.renderSpecificProjectPage(projectDetails);
        })

        /* Main Container Events (interactions via mainContainer) */

        mainContainer.addEventListener("move-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            this.intentionService.moveIntention(intentionPackage)

            const isSpecificPage = (this.mainContainerView.specificPageElement !== undefined)
            if (isSpecificPage) {
                const activeIntentions = this.intentionService.getIntentionsByProjectIdAndType("active", intentionPackage.projectId);
                const completedIntentions = this.intentionService.getIntentionsByProjectIdAndType("completed", intentionPackage.projectId);

                const project = this.projectService.getProjectById(intentionPackage.projectId);
                const transformedActive = this.projectService.transformIntentionList(activeIntentions)
                const transformedCompleted = this.projectService.transformIntentionList(completedIntentions)
                const completedCount = transformedCompleted.length;
                const projectDetails = { project, transformedActive, transformedCompleted, completedCount };
                mainContainerView.renderSpecificProjectPage(projectDetails);
                this.#refreshSideBar()
                return;
            }

            this.#choosePage(this.intentionService.currentFilter)
            this.#refreshSideBar()
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
                this.intentionService.setFilter("today")
                break;
            case "upcoming":
                this.intentionService.setFilter("upcoming")
                this.#showUpcomingPage()
                break;
            case "inbox":
                this.intentionService.setFilter("inbox")
                break;
            case "project":
                this.intentionService.setFilter("project")
                this.#showProjectsPage();
                break;
            default:
                this.intentionService.setFilter("today")
        }
    }

    #showProjectsPage() {
        const projects = this.getProjectGroups();
        this.mainContainerView.renderProjectsPage(projects);
    }

    #showUpcomingPage() {
        const transformedActive = this.projectService.transformIntentionList(this.intentionService.filteredActiveIntentions)
        const transformedCompleted = this.projectService.transformIntentionList(this.intentionService.filteredCompletedIntentions)
        const completedCount = transformedCompleted.length;
        const intentionDetails = { transformedActive, transformedCompleted, completedCount }
        this.mainContainerView.renderUpcomingPage(intentionDetails)
    }


    /* Some helper methods */

    getProjectGroups() {
        const projectGroups = this.projectService.groupIntentionsByProject(this.intentionService.unfilteredActiveIntentions);
        return projectGroups;
    }

    /* Methods for updating UI after changes made to state */

    #refreshSideBar() {
        this.sideBarView.renderNavCounts(this.intentionService.navActiveCounts);
        this.sideBarView.renderProjectList(this.getProjectGroups())
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
