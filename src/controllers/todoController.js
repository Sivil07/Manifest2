/* 

    The TodoController connects what the user does on screen to what the app
    does with the todo data. It holds no todo data and renders nothing itself.

    When the user interacts with components (editing, deleting, moving or 
    creating todos, for example), the components dispatch custom events.
    The controller listeners for these events and responds in two steps:
    it asks the TodoService to update the data, the instructs the TodoView to
    redraw the UI so the screen matches the current state.

    All event listeners are attached once in the constructor to the static DOm
    nodes provide by the view. This includes: the active/completed lists, the 
    parent container of both lists, the dialog and the action button. Events
    from individual todos travel up those elements, so no listener has to be 
    added or removed as todos come and go.

    The controller also manages the dialog. Opening the form, saving a todo and
    closing the dialog are all actions the controller orchestrates. When a todo is
    created or edited, the controller forwards the form's data to the service and 
    refreshes the UI once change has been made to the state.

    On initialization, the controller loads todos form the TodoService and renders
    them using the TodoView. Every change to the data, whether trigger by the user or
    startup logic, results in a full UI refresh to keep the screen in sync with the 
    underlying data.

    Overall, the TodoService manages the data, the TodoView renders the UI and 
    the TodoController orchestrates the actions between them in response to the user.

*/

class TodoController {
    constructor(todoService, todoView) {
        this.todoService = todoService;
        this.todoView = todoView;

        const todoAction = this.todoView.todoAction;
        todoAction.addEventListener("click", () => {
            this.todoView.displayTodoForm();
        });

        const todoLists = this.todoView.todoLists;
        todoLists.addEventListener("move-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            this.todoService.moveTodo(todoPackage);
            this.#refreshUI();
        });

        const todoActiveList = this.todoView.todoActiveList;
        todoActiveList.addEventListener("view-todo-item", (e) => {
            const id = e.detail.id;
            const todoChecked = e.detail.todoChecked;
            const todo = this.todoService.findTodoById(id, todoChecked);
            this.todoView.displayOneActiveTodo(todo);
        });

        todoActiveList.addEventListener("edit-todo-item", (e) => {
            const id = e.detail.id;
            const todoChecked = e.detail.todoChecked;
            const todo = this.todoService.findTodoById(id, todoChecked);
            this.todoView.displayTodoForm(todo);
        });

        todoActiveList.addEventListener("delete-todo-item", (e) => {
            const id = e.detail.id;
            const todoChecked = e.detail.todoChecked;
            this.#processDeletingTodo(id, todoChecked);
        });

        const todoCompletedList = this.todoView.todoCompletedList;
        todoCompletedList.addEventListener("clear-completed-todos", () => {
            this.todoService.clearCompletedTodos();
            this.#refreshUI();
        })

        const todoDialog = this.todoView.todoDialog;
        todoDialog.addEventListener("save-todo", (e) => {
            const todoPackage = e.detail.todoPackage;

            if (todoPackage.todoId) {
                this.#processEditingTodo(todoPackage.todoId, todoPackage.todoChecked, todoPackage.todoEntries);
                todoView.closeTodoDialog(todoDialog);

            } else {
                this.#processNewTodo(todoPackage.todoEntries);
                todoView.closeTodoDialog(todoDialog);
            }
        });

        todoDialog.addEventListener("close", () => {
            todoView.closeTodoDialog(todoDialog)
        })
    }

    #processDeletingTodo(id, todoChecked) {
        this.todoService.deleteTodo(id, todoChecked);
        this.#refreshUI();
    }

    #processEditingTodo(todoId, todoChecked, todoEntries) {
        this.todoService.editTodo(todoId, todoChecked, todoEntries);
        this.#refreshUI();
    }

    #processNewTodo(todoEntries) {
        this.todoService.createTodo(todoEntries);
        this.#refreshUI();
    }


    initialize() {
        this.todoService.loadTodos();
        this.#refreshUI();
    }

    #refreshUI() {
        this.todoView.displayActiveTodos(this.todoService.allActiveTodos);
        this.todoView.displayCompletedTodos(this.todoService.allCompletedTodos);
        this.todoView.displayTodoCounter(this.todoService.numberOfCompletedTodos);
    }
}

export default TodoController;
