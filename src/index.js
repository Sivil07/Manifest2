/* Global Styles  */

import "../public/css/fonts.css";
import "../public/css/global.css";

/* Custom Elements */

import "./views/sidebar/components/ProjectLink.js";
import "./views/main/components/ProjectItem.js"
import "./views/forms/components/ProjectForm.js";
import "./views/forms/components/IntentionForm.js";
import "./views/main/components/IntentionItem.js";
import "./views/forms/components/IntentionTemplate.js";
import "./views/forms/components/MoveToForm.js";

/* Component Styles */

import "./views/sidebar/components/project-link.css";
import "./views/main/components/project-item.css";
import "./views/forms/components/project-form.css";
import "./views/forms/components/intention-form.css";
import "./views/main/components/intention-item.css";
import "./views/forms/components/intention-template.css";
import "./views/forms/components/move-to-form.css";

/* Factory Styles */

import "./views/forms/factories/dialog.css";
import "./views/main/components/factories/section.css";

/* Views */

import SideBarView from "./views/sidebar/SidebarView.js";
import MainContentView from "./views/main/MainContentView.js";
import DialogView from "./views/forms/DialogView.js";

/* Services */

import IntentionService from "./services/IntentionService.js";
import ProjectService from "./services/ProjectService.js";

/* Controller */
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

const intentionService = new IntentionService()
const projectService = new ProjectService()

const globalController = new GlobalController( 
    intentionService,
    projectService,
    sideBarView,
    mainContainerView,
    dialogView
 )

globalController.initialize();
