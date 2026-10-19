class TodoController {
    constructor(todoService, todoView) {
        this.todoService = todoService;
        this.todoView = todoView;
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
