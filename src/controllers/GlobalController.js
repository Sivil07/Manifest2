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

        body.addEventListener("save-intention", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const projectPackage = { projectId: this.mainContainerView.currentProjectId }
            if (intentionPackage.hasIntentionId) {
                this.intentionService.editIntention(intentionPackage.hasIntentionId, intentionPackage.entries);
                this.dialogView.closeOverlays()
                this.#reRenderCurrentPage(projectPackage);
                return;
            }

            this.intentionService.createIntention(intentionPackage.entries);
            this.dialogView.closeDialog();
            this.#reRenderCurrentPage(projectPackage);
        })

        body.addEventListener("view-project", (e) => {
            const projectPackage = e.detail.projectPackage;
            this.#reRenderCurrentPage(projectPackage);
        })

        body.addEventListener("delete-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            this.intentionService.deleteIntention(intentionPackage.intentionId);
            const projectPackage = { projectId: this.mainContainerView.currentProjectId }
            this.#reRenderCurrentPage(projectPackage);
            this.dialogView.closeTemplate();
        });

        body.addEventListener("edit-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const intention = this.intentionService.findIntentionById(intentionPackage.intentionId);
            const project = this.projectService.getProjectById(intentionPackage.projectId)
            const projectId = project !== undefined ? project.id : "";
            const projectOptions = this.projectService.projectOptions
            const formPackage = { projectId, projectOptions, ...intention }
            this.dialogView.renderIntentionForm(formPackage);
        });

        body.addEventListener("open-move-form", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const intention = this.intentionService.findIntentionById(intentionPackage.intentionId);
            const projectOptions = this.projectService.projectOptions;
            const isTemplateOpen = intentionPackage.isTemplateOpen === undefined ? false : intentionPackage.isTemplateOpen
            const formPackage = { isTemplateOpen, intention, projectOptions }
            this.dialogView.renderMoveForm(formPackage)
        })

        body.addEventListener("update-intention-project", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const projectPackage = { projectId: this.mainContainerView.currentProjectId }
            this.intentionService.moveIntentionToProject(intentionPackage.intentionId, intentionPackage.projectId);
            if (intentionPackage.isTemplateOpen) {
                this.dialogView.closeOverlays()
                this.#reRenderCurrentPage(projectPackage);
                return;
            }

            this.dialogView.closeDialog();
            this.#reRenderCurrentPage(projectPackage);
        })

        /* Main Container Events (interactions via mainContainer) */

        mainContainer.addEventListener("move-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            this.intentionService.moveIntention(intentionPackage)
            const projectPackage = { projectId: this.mainContainerView.currentProjectId }
            this.#reRenderCurrentPage(projectPackage);
        });

        mainContainer.addEventListener("clear-completed-intentions", () => {
            const intentionPackage = { projectId: this.mainContainerView.currentProjectId }
            this.intentionService.clearCompletedIntentions(intentionPackage.projectId);
            this.#reRenderCurrentPage(intentionPackage);
        });

        mainContainer.addEventListener("view-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const intention = this.intentionService.findIntentionById(intentionPackage.intentionId);
            const project = this.projectService.getProjectById(intentionPackage.projectId)
            const projectName = project !== undefined ? project.projectName : "";
            const templatePackage = { projectName, intention }
            this.dialogView.renderIntentionTemplate(templatePackage)
        });

        /* Sidebar Events (interactions via static nodes in navBar) */

        sideBarAddProjectButton.addEventListener("click", () => {
            this.dialogView.renderProjectForm();
        })

        sideBarAddIntentionButton.addEventListener("click", () => {
            const projectOptions = this.projectService.projectOptions;
            const formPackage = { projectOptions }
            this.dialogView.renderIntentionForm(formPackage);
        });

        navSectionsContainer.addEventListener("click", (e) => {
            if (e.target === navSectionsContainer) return;

            const navButton = e.target.closest("button");
            const pageOption = navButton.dataset.action;
            this.#choosePage(pageOption)
        })
    }

    /* Navigation Methods (transitioning to another "page") */

    #reRenderCurrentPage(intentionPackage = null) {
        const hasProjectId = (intentionPackage.projectId !== undefined) ? intentionPackage.projectId : false
        if (hasProjectId) {
            const projectDetails = this.#buildProjectDetails(intentionPackage)
            this.mainContainerView.renderSpecificProjectPage(projectDetails);
            this.#refreshSideBar()
            return;
        }

        this.#choosePage(this.intentionService.currentFilter)
        this.#refreshSideBar()
    }


    #choosePage(pageOption) {
        switch (pageOption) {
            case "today":
                this.intentionService.setFilter("today")
                this.#showTodayPage();
                break;
            case "upcoming":
                this.intentionService.setFilter("upcoming")
                this.#showUpcomingPage()
                break;
            case "inbox":
                this.intentionService.setFilter("inbox")
                this.#showInboxPage();
                break;
            case "project":
                this.intentionService.setFilter("project")
                this.#showProjectsPage();
                break;
            default:
                this.intentionService.setFilter("today")
                this.#showTodayPage()
        }
    }

    #showTodayPage() {
        const intentionDetails = this.#buildFilteredIntentionDetails();
        this.mainContainerView.renderTodayPage(intentionDetails)
    }

    #showProjectsPage() {
        const projects = this.getProjectGroups();
        this.mainContainerView.renderProjectsPage(projects);
    }

    #showUpcomingPage() {
        const intentionDetails = this.#buildFilteredIntentionDetails();
        this.mainContainerView.renderUpcomingPage(intentionDetails)
    }

    #showInboxPage() {
        const intentionDetails = this.#buildFilteredIntentionDetails();
        this.mainContainerView.renderInboxPage(intentionDetails)
    }

    /* Page data builder methods */

    #buildProjectDetails(intentionPackage) {
        const activeIntentions = this.intentionService.getIntentionsByProjectIdAndType("active", intentionPackage.projectId);
        const completedIntentions = this.intentionService.getIntentionsByProjectIdAndType("completed", intentionPackage.projectId);

        const project = this.projectService.getProjectById(intentionPackage.projectId);
        const transformedActive = this.projectService.transformIntentionList(activeIntentions)
        const transformedCompleted = this.projectService.transformIntentionList(completedIntentions)
        const completedCount = transformedCompleted.length;
        const projectDetails = { project, transformedActive, transformedCompleted, completedCount };
        return projectDetails;
    }

    #buildFilteredIntentionDetails() {
        const transformedActive = this.projectService.transformIntentionList(this.intentionService.filteredActiveIntentions)
        const transformedCompleted = this.projectService.transformIntentionList(this.intentionService.filteredCompletedIntentions)
        const completedCount = transformedCompleted.length;
        const intentionDetails = { transformedActive, transformedCompleted, completedCount }
        return intentionDetails;
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
