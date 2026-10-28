import "../public/css/base.css";
import "./views/todoItem/todoItem.css";
import "./views/todoTemplate/todoTemplate.css";
import "./views/todoForm/todoForm.css";
import "./views/todoCounter/todoCounter.css"
import "./views/todoItem/todoItem.js";
import "./views/todoForm/todoForm.js";
import "./views/todoTemplate/todoTemplate.js";
import "./views/todoCounter/todoCounter.js";
import "./views/todoProgress/todoProgress.js";
import "./views/todoProgress/todoProgress.css";
import IntentionView from "./views/intentionView.js";
import IntentionService from "./services/intentionService.js";
import IntentionController from "./controllers/intentionController.js";

const intentionService = new IntentionService();
const intentionView = new IntentionView(
    document.querySelector("#todo-lists"),
    document.querySelector("#active-todo-list"),
    document.querySelector("#completed-todo-list"),
    document.querySelector("#my-dialog"),
    document.querySelector("#add-todo"),
    document.querySelector("#filter-today"),
    document.querySelector("#filter-upcoming")
);
const intentionController = new IntentionController(intentionService, intentionView);

intentionController.initialize();
