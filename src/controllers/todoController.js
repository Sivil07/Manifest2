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
            const todo = this.todoService.findTodoById(id);
            this.todoView.displayOneTodo(todo);
        });

        todoList.addEventListener("edit-todo-item", (e) => {
            const id = e.detail.id;
            const todo = this.todoService.findTodoById(id);
            this.todoView.displayTodoForm(todo);
        });

        const todoDialog = this.todoView.todoDialog;
        todoDialog.addEventListener("save-todo", (e) => {
            const todoData = e.detail.todoDetails;
            const todoId = e.detail.todoId;
            if (todoId) {
                this.#processEditingTodo(todoId, todoData);
                todoView.closeTodoDialog(todoDialog);

            } else {
                this.#processNewTodo(todoData);
                todoView.closeTodoDialog(todoDialog);
            }
        });

        todoDialog.addEventListener("close", () => {
            todoView.closeTodoDialog(todoDialog)
        })
    }

    #processEditingTodo(id, todoData) {
        this.todoService.editTodo(id, todoData);
        this.#refreshUI();
    }

    #processNewTodo(todoData) {
        this.todoService.createTodo(todoData);
        this.#refreshUI();
    }


    initialize() {
        this.todoService.loadTodos();
        this.#refreshUI();
    }

    #refreshUI() {
        this.todoView.displayTodos(this.todoService.allTodos);
    }
}

export default TodoController;
