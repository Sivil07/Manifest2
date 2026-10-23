class TodoView {
    constructor(todoActiveList, todoDialog, todoAction) {
        this.todoActiveList = todoActiveList;
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
