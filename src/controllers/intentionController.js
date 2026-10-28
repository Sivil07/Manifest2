/* 

    The IntentionController connects what the user does on screen to what the app
    does with the intention data. It holds no intention data and renders nothing itself.


    When the user interacts with components (editing, deleting, moving or 
    creating intentions, or switching between Today and Upcoming filters), 
    the components dispatch custom events.
    
    The controller listeners for these events and responds in two steps:
    it asks the IntentionService to update the data, then it instructs 
    the IntentionView to redraw the UI so the screen matches the current state.

    Actions that don't change any data skip the first step. Opening the 
    form (to add or edit an intention) and viewing a single intention 
    only ask the view to display something.

    All event listeners are attached once in the constructor to the static
    dom nodes provide by the view. This includes: the active/completed list, 
    the parent container of both lists, the dialog, the add button and the 
    filter buttons. 

    Events from individual intentions travel up those elements, so no listener has
    to be added or removed as intentions come and go. Each event carries an 
    intentionPackage holding what the controller needs to identify the 
    intention (its id) and what changed.

    The controller also manages the form dialog. When the form is saved, an intention
    that already has an id serves as an editing event. If it doesn't have an id, then
    its considered a new intention. The controller forwards the form's data to the service,
    refreshes the ui once the change has been made to the state, and closes the dialog. 

    On initialization, the controller loads the intentions through the service (which
    will start on the "today" filter) and renders them using the view. Every change to
    the data or the filter results in a full UI refresh to keep the screen in sync with
    the underlying data.

    Overall, the IntentionService manages the data an decides which intentions belong to the current
    filter, the IntentionView accepts data from the service to render the UI and the controller 
    orchestrates the actions between them in response to the user.

*/

class IntentionController {
    constructor(todoService, todoView) {
        this.todoService = todoService;
        this.todoView = todoView;

        const todoDialog = this.todoView.todoDialog;

        todoDialog.addEventListener("save-todo", (e) => {
            const todoPackage = e.detail.todoPackage;

            if (todoPackage.todoId) {
                this.#handleEditTodo(todoPackage.todoId, todoPackage.todoEntries);
                todoView.closeTodoDialog(todoDialog);

            } else {
                this.#handleCreateTodo(todoPackage.todoEntries);
                todoView.closeTodoDialog(todoDialog);
            }
        });

        todoDialog.addEventListener("close", () => {
            todoView.closeTodoDialog(todoDialog)
        });

        const addTodoButton = this.todoView.addTodoButton;
        const todayButton = this.todoView.filterTodayButton;
        const upcomingButton = this.todoView.filterUpcomingButton;

        addTodoButton.addEventListener("click", () => {
            this.todoView.displayTodoForm();
        });

        todayButton.addEventListener("click", () => {
            this.todoService.setFilter("today");
            this.#refreshUI()
        });

        upcomingButton.addEventListener("click", () => {
            this.todoService.setFilter("upcoming");
            this.#refreshUI();
        })

        const todoListsContainer = this.todoView.todoListsContainer;
        const todoActiveList = this.todoView.todoActiveList;
        const todoCompletedList = this.todoView.todoCompletedList;

        todoListsContainer.addEventListener("move-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            this.todoService.moveIntention(todoPackage.todoId, todoPackage.newCompletedStatus);
            this.#refreshUI();
        });

        todoActiveList.addEventListener("view-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            const todo = this.todoService.findIntentionById(todoPackage.todoId);
            this.todoView.displayOneActiveTodo(todo);
        });

        todoActiveList.addEventListener("edit-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            const todo = this.todoService.findIntentionById(todoPackage.todoId);
            this.todoView.displayTodoForm(todo);
        });

        todoActiveList.addEventListener("delete-todo-item", (e) => {
            const todoPackage = e.detail.todoPackage;
            this.#handleDeleteTodo(todoPackage.todoId);
        });

        todoCompletedList.addEventListener("clear-completed-todos", () => {
            this.todoService.clearCompletedFilteredIntentions();
            this.#refreshUI();
        })

    }

    #handleDeleteTodo(id) {
        this.todoService.deleteIntention(id);
        this.#refreshUI();
    }

    #handleEditTodo(todoId, todoEntries) {
        this.todoService.editIntention(todoId, todoEntries);
        this.#refreshUI();
    }

    #handleCreateTodo(todoEntries) {
        this.todoService.createIntention(todoEntries);
        this.#refreshUI();
    }


    initialize() {
        this.todoService.load();
        this.#refreshUI();
    }

    #refreshUI() {
        this.todoView.displayActiveTodos(this.todoService.allActiveIntentions);
        this.todoView.displayCompletedTodos(this.todoService.allCompletedIntentions);
        this.todoView.displayTodoCounter(this.todoService.filteredCompletedCount);
    }
}

export default IntentionController;
