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
    }
}

export default TodoController;
