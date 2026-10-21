class TodoView {
    constructor(todoList, todoDialog, todoAction) {
        this.todoList = todoList;
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

    displayTodos(todos) {
        this.todoList.innerHTML = "";

        for (const todo of todos) {
            const todoItem = document.createElement("todo-item");
            todoItem.todoData = todo;
            this.todoList.appendChild(todoItem);
        }
    }
    
    displayOneTodo(todo) {
        const todoTemplate = document.createElement("todo-template");
        todoTemplate.id = "template";
        todoTemplate.templateData = todo;
        this.todoList.appendChild(todoTemplate);
    }
}

export default TodoView;
