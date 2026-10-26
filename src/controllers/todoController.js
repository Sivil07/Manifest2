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

        const addTodoButton = this.todoView.addTodoButton;
        addTodoButton.addEventListener("click", () => {
            this.todoView.displayTodoForm();
        });

        const todayButton = this.todoView.filterTodayButton;
        todayButton.addEventListener("click", () => {
            this.todoService.setFilter("today");
            this.#refreshUI()
        });

        const upcomingButton = this.todoView.filterUpcomingButton;
        upcomingButton.addEventListener("click", () => {
            this.todoService.setFilter("upcoming");
            this.#refreshUI();

        })

        const todoListsContainer = this.todoView.todoListsContainer;
        todoListsContainer.addEventListener("move-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            this.todoService.moveTodo(todoPackage);
            this.#refreshUI();
        });

        const todoActiveList = this.todoView.todoActiveList;
        todoActiveList.addEventListener("view-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            const todo = this.todoService.findTodoById(todoPackage.todoId, todoPackage.isCompleted);
            this.todoView.displayOneActiveTodo(todo);
        });

        todoActiveList.addEventListener("edit-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            const todo = this.todoService.findTodoById(todoPackage.todoId, todoPackage.isCompleted);
            this.todoView.displayTodoForm(todo);
        });

        todoActiveList.addEventListener("delete-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            this.#handleDeleteTodo(todoPackage.todoId, todoPackage.isCompleted);
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
                this.#handleEditTodo(todoPackage.todoId, todoPackage.todoChecked, todoPackage.todoEntries);
                todoView.closeTodoDialog(todoDialog);

            } else {
                this.#handleCreateTodo(todoPackage.todoEntries);
                todoView.closeTodoDialog(todoDialog);
            }
        });

        todoDialog.addEventListener("close", () => {
            todoView.closeTodoDialog(todoDialog)
        })
    }

    #handleDeleteTodo(id, isCompleted) {
        this.todoService.deleteTodo(id, isCompleted);
        this.#refreshUI();
    }

    #handleEditTodo(todoId, isCompleted, todoEntries) {
        this.todoService.editTodo(todoId, isCompleted, todoEntries);
        this.#refreshUI();
    }

    #handleCreateTodo(todoEntries) {
        this.todoService.createTodo(todoEntries);
        this.#refreshUI();
    }


    initialize() {
        this.todoService.load();
        this.#refreshUI();
    }

    #refreshUI() {
        this.todoView.displayActiveTodos(this.todoService.allActiveTodos);
        this.todoView.displayCompletedTodos(this.todoService.allCompletedTodos);
        // this.todoView.displayTodoCounter(this.todoService.numberOfCompletedTodos);
    }
}

export default TodoController;
