/*
    The TodoView class handles everything the user sees on screen. This includes
    the active/completed todo lists, the pop up form dialog and the completed todos
    counter.

    It never manages the data itself. The TodoService owns the data and the TodoController
    retrieves that data and passes it to the view. The view turns what it receives to
    dom elements on screen.

    What the app starts, TodoView is given fixed DOM nodes that always exist on the page.
    This includes: the active list, the completed list, the parent container for both lists,
    the dialog element and the button that opens the form.

    UI components with todo data are inserted into these static nodes. Some nodes like the 
    button was exposed so the controller can attach listeners to them.

    The counter, the form, the template and the todo are rendered as custom components.
    (todo-item, todo-form, todo-counter, todo-template). For each component, the view creates
    the element, assigns its data using a todo object through a setter and the component 
    builds its own internal structure with the updated data inside. Then, the view inserts
    the finished element into the correct parent node.

    Like the service, the view does some internal tracking but for what's currently displayed
    on screen. It keeps references to completed-todo and counter nodes so they can be removed
    before being redrawn.

    The TodoController will call the TodoView methods in response to a user's action and the
    view will update the ui based on the changes.

    Overall, the TodoService manages the data, the TodoController coordinates the actions and
    the TodoView handles how todos appear on screen.

*/

class TodoView {
    #completedTodos = []
    #trackCounter;

    constructor(todoLists, todoActiveList, todoCompletedList, todoDialog, todoAction) {
        this.todoLists = todoLists;
        this.todoActiveList = todoActiveList;
        this.todoCompletedList = todoCompletedList;
        this.todoDialog = todoDialog;
        this.todoAction = todoAction;
    }

    displayTodoForm( todoData = {} ) {
        const todoForm = document.createElement("todo-form");
        todoForm.formData = todoData;
        this.todoDialog.appendChild(todoForm);
        this.todoDialog.showModal();
    }

    closeTodoDialog(todoDialog) {
        todoDialog.close();
        this.todoDialog.innerHTML = "";
    }
    
    displayTodoCounter(numberOfCompletedTodos) {
        if (this.#trackCounter !== undefined) this.#trackCounter.remove();
        if (numberOfCompletedTodos === 0) return;

        const todoCounter = document.createElement("todo-counter");
        todoCounter.todoCount = numberOfCompletedTodos;
        this.#trackCounter = todoCounter;

        this.todoCompletedList.prepend(todoCounter);
    }

    #removeCompletedTodos() {
        for (const completeTodo of this.#completedTodos) {
            completeTodo.remove();
        }
    }

    displayCompletedTodos(completedTodos) {
        this.#removeCompletedTodos();

        for (const completedTodo of completedTodos) {
            const completedTodoItem = document.createElement("todo-item");
            completedTodoItem.todoData = completedTodo;
            this.#completedTodos.push(completedTodoItem);
            this.todoCompletedList.appendChild(completedTodoItem);
        }
    }

    displayActiveTodos(activeTodos) {
        this.todoActiveList.innerHTML = "";

        for (const activeTodo of activeTodos) {
            const todoItem = document.createElement("todo-item");
            todoItem.todoData = activeTodo;
            this.todoActiveList.appendChild(todoItem);
        }
    }
    
    displayOneActiveTodo(activeTodo) {
        const todoTemplate = document.createElement("todo-template");
        todoTemplate.id = "template";
        todoTemplate.templateData = activeTodo;
        this.todoActiveList.appendChild(todoTemplate);
    }
}

export default TodoView;
