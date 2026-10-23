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
