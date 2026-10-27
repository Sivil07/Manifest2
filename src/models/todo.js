/*
    A todo defines the core piece of data that moves around the app. It represents
    a single task in the user's list and stores the essential information that
    describes the task. This includes: its id, the title, reason and if its 
    completed. Defining this shape in one place ensures, the service, the controller
    and the view all rely on the same fields when accessing todo data.

    A Todo knows nothing about how it is stored, displayed or interacted with. Each
    part of the app handles it in its own way:
        - The TodoService creates, stores, updates and saves Todos. Saved data is stored
          as JSON, so the service reconstructs real Todo instances when the app loads.
        - The TodoController passes references to a Todo's id or checked state between
          the service and the view in response to user actions.
        - The TodoView and TodoItem display a Todo's data. The TodoItem is a snapshot of
          a Todo at the moment it was rendered and is recreated whenever the underlying Todo
          changes.
          
    The Todo's method's only update its own fields. Decisions about which lists a Todo belongs
    to, how it moves between lists, and when it is saved are handled entirely by the TodoService.
    
    Overall, the Todo model serves as the source of truth for a single task. It defines that data
    that flows through the system while the service manages its state, the view renders the UI
    and the controller coordinates interactions between the UI and the state.

*/
class Todo {
    constructor({ id = crypto.randomUUID(), title, reason, isChecked = false, dueDate, description = "" }) {
        this.id = id;
        this.title = title;
        this.reason = reason;
        this.isChecked = isChecked;
        this.dueDate = dueDate;
        this.description = description
    }

    applyUpdates({ title, reason, dueDate, description }) {
        this.title = title;
        this.reason = reason;
        this.dueDate = dueDate;
        this.description = description;
    }

    setCompletedStatus(checkedData) {
        this.isChecked = checkedData;
    }
}

export default Todo;
