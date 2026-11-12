import { getCurrentDate } from "../utils/date.js";

/*
    An Intention is one of the core data models of the application. 

    It represents a single task created by the user and defines the complete
    shape of the task as an "Intention" as it passes throughout the system. 

    Defining this structure in one place ensures that the controller, services, 
    views and components all work with the same structure for the data when
    accessing or manipulating intention data.

    The Intention model does not manage storage, rendering, filtering or 
    state.
    
    An intention only manages updates to its own properties through methods such
    as updating the intention details, changing the completed status or assigning
    an intention to a project.

    Overall, the Intention model acts as a single source of truth for an individual 
    intention while other portions like the services, controllers and views handle 
    other application behavior and data presentation.
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
    
    /* Updates the details of an intention (used in IntentionForm) */
    applyUpdates({ title, reason, dueDate, description, projectId }) {
        this.title = title;
        this.reason = reason;
        this.dueDate = dueDate;
        this.description = description;
        this.projectId = projectId
    }

    /* Assigns the intention to a project or inbox (used in MoveToForm) */
    moveToProject(projectId) {
        this.projectId = projectId
    }

    /* Updates the intention's completion status (used in IntentionForm) */
    setCompletedStatus(checkedData) {
        this.isChecked = checkedData;
    }
}

export default Intention;
