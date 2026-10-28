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
    constructor(intentionService, intentionView) {
        this.intentionService = intentionService;
        this.intentionView = intentionView;

        const intentionDialog = this.intentionView.intentionDialog;

        intentionDialog.addEventListener("save-intention", (e) => {
            const intentionPackage = e.detail.intentionPackage;

            if (intentionPackage.intentionId) {
                this.#handleEditIntention(intentionPackage.intentionId, intentionPackage.intentionEntries);
                intentionView.closeIntentionDialog(intentionDialog);

            } else {
                this.#handleCreateIntention(intentionPackage.intentionEntries);
                intentionView.closeIntentionDialog(intentionDialog);
            }
        });

        intentionDialog.addEventListener("close", () => {
            intentionView.closeIntentionDialog(intentionDialog)
        });

        const addIntentionButton = this.intentionView.addIntentionButton;
        const todayButton = this.intentionView.filterTodayButton;
        const upcomingButton = this.intentionView.filterUpcomingButton;

        addIntentionButton.addEventListener("click", () => {
            this.intentionView.displayIntentionForm();
        });

        todayButton.addEventListener("click", () => {
            this.intentionService.setFilter("today");
            this.#refreshUI()
        });

        upcomingButton.addEventListener("click", () => {
            this.intentionService.setFilter("upcoming");
            this.#refreshUI();
        })

        const intentionListContainer = this.intentionView.intentionListsContainer;
        const intentionActiveList = this.intentionView.intentionActiveList;
        const intentionCompletedList = this.intentionView.intentionCompletedList;

        intentionListContainer.addEventListener("move-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            this.intentionService.moveIntention(intentionPackage.intentionId, intentionPackage.newCompletedStatus);
            this.#refreshUI();
        });

        intentionActiveList.addEventListener("view-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const intention = this.intentionService.findIntentionById(intentionPackage.intentionId);
            this.intentionView.displayOneActiveIntention(intention);
        });

        intentionActiveList.addEventListener("edit-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            const intention = this.intentionService.findIntentionById(intentionPackage.intentionId);
            this.intentionView.displayIntentionForm(intention);
        });

        intentionActiveList.addEventListener("delete-intention-item", (e) => {
            const intentionPackage = e.detail.intentionPackage;
            this.#handleDeleteIntention(intentionPackage.intentionId);
        });

        intentionCompletedList.addEventListener("clear-completed-intentions", () => {
            this.intentionService.clearCompletedFilteredIntentions();
            this.#refreshUI();
        })

    }

    #handleDeleteIntention(id) {
        this.intentionService.deleteIntention(id);
        this.#refreshUI();
    }

    #handleEditIntention(intentionId, intentionEntries) {
        this.intentionService.editIntention(intentionId, intentionEntries);
        this.#refreshUI();
    }

    #handleCreateIntention(intentionEntries) {
        this.intentionService.createIntention(intentionEntries);
        this.#refreshUI();
    }


    initialize() {
        this.intentionService.load();
        this.#refreshUI();
    }

    #refreshUI() {
        this.intentionView.displayActiveIntentions(this.intentionService.allActiveIntentions);
        this.intentionView.displayCompletedIntentions(this.intentionService.allCompletedIntentions);
        this.intentionView.displayIntentionCounter(this.intentionService.filteredCompletedCount);
    }
}

export default IntentionController;
