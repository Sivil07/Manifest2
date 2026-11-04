// import "../public/css/base.css";
// import "./views/intentionItem/intentionItem.css";
// import "./views/intentionTemplate/intentionTemplate.css";
// import "./views/intentionForm/intentionForm.css";
// import "./views/intentionCounter/intentionCounter.css"
// import "./views/intentionProgress/intentionProgress.css";
// import "./views/intentionItem/intentionItem.js";
// import "./views/intentionForm/intentionForm.js";
// import "./views/intentionTemplate/intentionTemplate.js";
// import "./views/intentionCounter/intentionCounter.js";
// import "./views/intentionProgress/intentionProgress.js";
// import IntentionView from "./views/intentionView.js";
// import IntentionService from "./services/intentionService.js";
// import IntentionController from "./controllers/intentionController.js";

// const intentionService = new IntentionService();
// const intentionView = new IntentionView(
//     document.querySelector("#todo-lists"),
//     document.querySelector("#active-todo-list"),
//     document.querySelector("#completed-todo-list"),
//     document.querySelector("#my-dialog"),
//     document.querySelector("#add-todo"),
//     document.querySelector("#filter-today"),
//     document.querySelector("#filter-upcoming")
// );
// const intentionController = new IntentionController(intentionService, intentionView);

// intentionController.initialize();


import "../public/css/fonts.css";
import "../public/css/global.css";
import "./views/sidebar/components/project-link.css";
import "./views/sidebar/components/ProjectLink.js";
import "./views/main/components/ProjectItem.js"
import "./views/main/components/project-item.css";
import "./views/forms/components/ProjectForm.js";
import "./views/forms/components/project-form.css";
import "./views/forms/components/IntentionFormNew.js";
import "./views/forms/factories/dialog.css";
import "./views/main/components/factories/project-section.css";
import SideBarView from "./views/sidebar/SidebarView.js";
import MainContentView from "./views/main/MainContentView.js";
import DialogView from "./views/forms/DialogView.js";
import IntentionExperiment from "./services/IntentionExperiment.js";
import ProjectService from "./services/ProjectService.js";
import GlobalController from "./controllers/GlobalController.js";

const sideBarView = new SideBarView(
    document.querySelector("#nav-sections"),
    document.querySelector("#project-list"),
    document.querySelector("#projects-add"),
    document.querySelector("#add-intention")
)

const mainContainerView = new MainContentView(
    document.querySelector("#main-content")
)

const dialogView = new DialogView()

const intentionService = new IntentionExperiment()
const projectService = new ProjectService()

const globalController = new GlobalController( 
    intentionService,
    projectService,
    sideBarView,
    mainContainerView,
    dialogView
 )


// const formDialog = document.querySelector("dialog");
// formDialog.showModal();

globalController.initialize();
