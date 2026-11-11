import { getCurrentDate } from "../utils/date.js";

/*
    An intention defines the core piece of data that moves around the app. It represents
    a single task in the user's list and stores the essential information that
    describes the task. This includes: its id, the title, reason, dueDate, description if its 
    completed. 
    
    Defining the Intention's shape in one place ensures, the service, the controller
    and the view all rely on the same fields when accessing or manipulating intention data.

    An Intention knows nothing about how it is stored, displayed or interacted with. Each
    part of the app handles it in its own way:
    
        - The IntentionService creates, stores, updates and saves Intentions. Saved data is stored
          as JSON, so the service reconstructs real Intention instances when the app loads.
        - The IntentionController coordinates user actions by passing a Intention's id or updated
          fields between the view and the service in response to user actions.
        - The IntentionView and IntentionItem display a Intention's data. The IntentionItem is a snapshot of
          a Intention at the moment it was rendered and is recreated whenever the underlying Todo
          changes.
          
    The Intention's method's only update its own fields. Decisions about which lists a Intention belongs
    to, how it moves between lists, and when it is saved are handled entirely by the IntentionService.
    
    Overall, the Intention model serves as the source of truth for a single task. It defines that data
    that flows through the system while the service manages its state, the view renders the UI
    and the controller coordinates interactions between the UI and the state.

*/
class Intention {
    constructor({ id = crypto.randomUUID(), title, reason, isChecked = false, dueDate, description = "", createdAt = getCurrentDate(), projectId}) {
        this.id = id;
        this.title = title;
        this.reason = reason;
        this.isChecked = isChecked;
        this.dueDate = dueDate;
        this.description = description;
        this.createdAt = createdAt
        this.projectId = projectId;
    }
    
    /* Used in IntentionForm */
    applyUpdates({ title, reason, dueDate, description, projectId }) {
        this.title = title;
        this.reason = reason;
        this.dueDate = dueDate;
        this.description = description;
        this.projectId = projectId
    }

    /* Used in MoveToForm */
    moveToProject(projectId) {
        this.projectId = projectId
    }

    setCompletedStatus(checkedData) {
        this.isChecked = checkedData;
    }
}

export default Intention;
