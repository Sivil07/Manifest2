/*
    A single todo item on the user's todo list.

    A Todo is the core piece of data that will move through
    the app. 
    
    Currently, it holds what the user entered (a title and reason)
    and whether the todo is completed.
    
    Defining its shape here would mean the controller, service and 
    views will all rely on this structure when accessing and 
    manipulating its data.
    
    Everything was built around this item.
*/
class Todo {
    constructor({ id = crypto.randomUUID(), title, reason, isChecked = false }) {
        this.id = id;
        this.title = title;
        this.reason = reason;
        this.isChecked = isChecked;
    }

    /*   
        Updates the title and reason using the values submitted in the form.
        Used both when creating a todo and when editing one.    
    */
    updateTodo({ title, reason }) {
        this.title = title
        this.reason = reason;
    }

    /*  
        Marks the todo as done (true) or not done (false).

        This decides which list it will belong to. Either
        the active todos or completed todos stored in the 
        service.
    */
    updateChecked(checkedData) {
        this.isChecked = checkedData;
    }
}

export default Todo;
