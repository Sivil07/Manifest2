class TodoController {
    constructor(todoService, todoView) {
        this.todoService = todoService;
        this.todoView = todoView;

        const todoAction = this.todoView.todoAction;
        todoAction.addEventListener("click", () => {
            this.todoView.displayTodoForm();
        });

        const todoList = this.todoView.todoList;
        todoList.addEventListener("view-todo-item", (e) => {
            const id = e.detail.id;
            const todoChecked = e.detail.todoChecked;
            const todo = this.todoService.findTodoById(id);
            this.todoView.displayOneTodo(todo);
        });

        todoList.addEventListener("edit-todo-item", (e) => {
            const id = e.detail.id;
            const todoChecked = e.detail.todoChecked;
            const todo = this.todoService.findTodoById(id);
            this.todoView.displayTodoForm(todo);
        });

        todoList.addEventListener("delete-todo-item", (e) => {
            const id = e.detail.id;
            const todoChecked = e.detail.todoChecked;
            this.#processDeletingTodo(id);
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

    #processDeletingTodo(id) {
        this.todoService.deleteTodo(id);
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
        this.todoView.displayTodos(this.todoService.allActiveTodos);
    }
}

export default TodoController;
