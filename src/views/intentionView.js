/*
    The IntentionView class handles everything the user sees on screen. This includes
    the active/completed lists, the completed-todos counter, the buttons that open the 
    form and that switch between the Today and Upcoming filters.

    The IntentionView never manages the data itself, and the it doesn't what appears.
    The IntentionService owns the data and works out which intentions belong to the
    current filter. The controller reads that result from the service and passes it 
    to the view, which turns what it receives into DOM elements.
    
    When the app starts, the view is given the fixed dom elements that always exist
    on page. This includes the active/completed lists, the container that holds both
    lists, the dialog, the add button and the two filter buttons. Also, they are
    exposed as public properties so the controller can attach listeners to them, such
    as clicks on the buttons.

    Intentions, the form, the counter and the single-intention view are drawn as custom
    events (todo-item, todo-form, todo-counter, todo-template). For each one, the IntentionView
    creates the element, gives it its data through a setter, and the component builds its own 
    contents with the inserted data. Then the view inserts the finished element into the 
    correct parent node.

    Like the service, the view does some tracking but only for what's currently on screen.
    This includes the completed-todo elements and the counter so they can be removed before 
    being redrawn. This tracks information about the screen layout. Not the intention data.

    The controller calls the IntentionView's methods in response to a user's actions.

    Overall, the service manages the intention data, the controller coordinates the actions and
    the view handles how the intentions appear on screen.

*/

class IntentionView {
    #completedIntentionElements = []
    #counterElement;

    constructor(intentionListsContainer, intentionActiveList, intentionCompletedList, intentionDialog, addIntentionButton, filterTodayButton, filterUpcomingButton) {
        this.intentionListsContainer = intentionListsContainer;
        this.intentionActiveList = intentionActiveList;
        this.intentionCompletedList = intentionCompletedList;
        this.intentionDialog = intentionDialog;
        this.addIntentionButton = addIntentionButton;
        this.filterTodayButton = filterTodayButton;
        this.filterUpcomingButton = filterUpcomingButton;
    }

    displayTodoForm( todoData = {} ) {
        const intentionForm = document.createElement("todo-form");
        intentionForm.formData = todoData;
        this.intentionDialog.appendChild(intentionForm);
        this.intentionDialog.showModal();
    }

    closeTodoDialog(todoDialog) {
        todoDialog.close();
        this.intentionDialog.innerHTML = "";
    }
    
    displayTodoCounter(numberOfCompletedTodos) {
        if (this.#counterElement !== undefined) this.#counterElement.remove();
        if (numberOfCompletedTodos === 0) return;

        const todoCounter = document.createElement("todo-counter");
        todoCounter.todoCount = {
            completedTodoNum: numberOfCompletedTodos
        }
        this.#counterElement = todoCounter;

        this.intentionCompletedList.prepend(todoCounter);
    }

    #removeCompletedTodoElements() {
        for (const completeTodo of this.#completedIntentionElements) {
            completeTodo.remove();
        }
    }

    displayCompletedTodos(completedTodos) {
        this.#removeCompletedTodoElements();

        for (const completedTodo of completedTodos) {
            const completedTodoItem = document.createElement("todo-item");
            completedTodoItem.todoData = completedTodo;
            this.#completedIntentionElements.push(completedTodoItem);
            this.intentionCompletedList.appendChild(completedTodoItem);
        }
    }

    displayActiveTodos(activeTodos) {
        this.intentionActiveList.innerHTML = "";

        for (const activeTodo of activeTodos) {
            const todoItem = document.createElement("todo-item");
            todoItem.todoData = activeTodo;
            this.intentionActiveList.appendChild(todoItem);
        }
    }
    
    displayOneActiveTodo(activeTodo) {
        const todoTemplate = document.createElement("todo-template");
        todoTemplate.id = "template";
        todoTemplate.templateData = activeTodo;
        this.intentionActiveList.appendChild(todoTemplate);
    }
}

export default IntentionView;
