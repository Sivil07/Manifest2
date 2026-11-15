/*
    The GlobalController the central coordinator of the application. It receives the user's 
    actions, decides what should happen and coordinates the communication between the services 
    and views to make it happen. It owns no application state of its own, does not render the
    UI directly and never interacts with the localStorage.

    The controller is the only layer that knows about both services and views. Services never 
    communicate directly with views, views never communicate directly with services, and the 
    services remain unaware of each other. When data must move between layers, the controller
    acts as the intermediary.

    For example, intention data from IntentionService is passed to ProjectService so project 
    information can be paired with each intention for rendering. Likewise, when a project is 
    deleted, the controller coordinates both ProjectService and IntentionService to remove the 
    project and its associated intentions.

    During construction, the controller attaches listeners to the application's static dom nodes. 
    Custom events dispatched from custom elements bubble to either the body or the main content
    container. This will allow the controller to respond to form submissions, project actions, 
    intention actions, and navigation events.

    Most controller operations follow the same pattern:

        1. Read data from an event.
        2. Ask a service to perform an operation.
        3. Close any affected overlays.
        4. reRender the current page.
        5. Refresh the sidebar.
    
    Page rendering is determined by the currently selected page. For Today, Upcoming, Inbox, and Projects, 
    the controller updates the IntentionService filter and renders the appropriate page. Specific project 
    pages are handled separately using the currentProjectId maintained by MainContentView.

    The controller also prepares data for rendering. Its build methods gather and transform information 
    from the services into the data packages expected by the views so the views do not need to know where 
    the data originated.

    The initialize method runs once when the application starts. It loads data from both services, 
    refreshes the sidebar, and displays the default Today page.

    Overall, the GlobalController connects user interactions to application state and application state to 
    the UI. this allows each layer of the architecture to remain focused on its own responsibilities.
*/

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

        /* Global Events (actions within body) */

        body.addEventListener("open-project-form", () => {
            this.dialogView.renderProjectForm();
        });

        body.addEventListener("close-form", () => {
            this.dialogView.closeDialog()
        });

        body.addEventListener("save-project", (e) => {
            const dataPackage = e.detail.projectPackage;
            const projectPackage = { projectId: this.mainContainerView.currentProjectId }
            const hasDuplicate = this.projectService.hasDuplicate(dataPackage.projectName);
            if (hasDuplicate) {
                this.dialogView.showError();
                return;
            }

            this.projectService.createProject(dataPackage);
            this.dialogView.closeDialog();
            this.#reRenderCurrentPage(projectPackage);
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

        /* Main Container Events (interactions within mainContainer) */

        mainContainer.addEventListener("move-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            this.intentionService.changeCompletionStatus(intentionPackage)
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

        mainContainer.addEventListener("delete-project", () => {
            const projectId = this.mainContainerView.currentProjectId;
            this.projectService.deleteProject(projectId);
            this.intentionService.deleteIntentionsByProjectId(projectId);
            this.#choosePage("project")
            this.#refreshSideBar();
        })

        /* Sidebar Events (interactions within navBar) */

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


    #choosePage(pageOption = "today") {
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
        const counts = { count: this.intentionService.dailyCount, maxCount: this.intentionService.dailyMaxCount }
        const intentionPackage = { ...intentionDetails, ...counts }
        this.mainContainerView.renderTodayPage(intentionPackage)
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
        const sidebarPackage = {
            projectCount: this.projectService.numberOfProjects,
            ...this.intentionService.navActiveCounts
        }

        this.sideBarView.renderNavCounts(sidebarPackage);
        this.sideBarView.renderProjectList(this.getProjectGroups())
    }

    /* Initialization */

    initialize() {
        this.intentionService.loadIntentions();
        this.projectService.loadProjects();
        this.#refreshSideBar();
        this.#choosePage()
    }
}


export default GlobalController;
