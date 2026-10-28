import Intention from "../models/intention.js";
import { starterData } from "../starterData.js";
import { getCurrentDate } from "../utils/date.js";

/* 
    The IntentionService manages the app's todos: either creating, editing, moving, deleting or persisting them

    This is the only layer that knows where todos are stored. The controller and the IntentionView always 
    ask the IntentionService to perform operations internally without needing to interact with the storage
    or intention objects themselves.

    While the app runs, all todos live in one list in memory (allTodos) as real Intention objects.
    There are no separate active and completed lists. The getters build them once they're requested
    by filtering the single list into two things: which filter the user is viewing (today or upcoming)
    and whether the intention is checked (completed or not completed.). Because nothing is stored twice,
    completing an intention only changes its checked state. The next time a getter used, the intention will
    show up in the right list.

    The filter is based on each todo's due date compared with today's date:
        - "today": intentions due today
        - "upcoming": every todo not due today.

    The service remembers the current filter. It starts as "today" filter every time the todos are loaded.

    All intentions are saved together in the local storage under on key called "all-intentions". The localStorage
    persists the intentions as JSON objects which causes them to lose their "Intention" identify and 
    behavior so the service rebuilds them into Intention instances on every load.

    If no saved data exists on the first load, the service uses the starter data instead and persists 
    it so the UI has initial intentions to work with.

    Any change to the internal lists is saved to localStorage so the changes made can survive a reload,
    and the controller uses the service's getters to provide the IntentionView with update information.
    All operations (create, edit, delete, clear) is saved right away so it survives a reload.

    Overall, IntentionService manages the data and decides which intentions belongs to the current filter.
    The IntentionView describes how that data appears on screen. The IntentionController coordinates
    between the two.

*/

class IntentionService {
    #allIntentions = [];

    /* Defines which group the user is viewing. Either "today" or "upcoming" */
    currentFilter;

    /* Defines the number of completed intentions in the current filter */
    filteredCompletedCount;

    /* Incomplete intentions that match the current filter */
    get allActiveIntentions() {
        return this.#allIntentions.filter((intention) => {
            const matchesCurrentFilter = this.#matchesFilter(intention);
            const isCompleted = !intention.isChecked;
            return matchesCurrentFilter && isCompleted;
        })
    }

    /* Complete intentions that match the current filter. Also updates the filterCompletedCount  */
    get allCompletedIntentions() {
        const completedIntentions = this.#allIntentions.filter((intention) => {
            const matchesCurrentFilter = this.#matchesFilter(intention);
            const isCompleted = intention.isChecked;
            return matchesCurrentFilter && isCompleted;
        })
        this.filteredCompletedCount = completedIntentions.length;
        return completedIntentions
    }

    /* Determines whether an intention belongs to the current filter based on the dueDate */
    #matchesFilter(intention) {
        const today = getCurrentDate();
        if (this.currentFilter === "today") return intention.dueDate === today;
        if (this.currentFilter === "upcoming") return intention.dueDate !== today;
    }

    /* Chooses which group of intentions are shown */
    setFilter(filterOption = "today") {
        this.currentFilter = filterOption
    }

    /* Removes intentions that belong to the currentFilter after the user clicks "Clear Completed" */
    clearCompletedFilteredIntentions(filterOption) {
        this.currentFilter = filterOption

        const remainingIntentions = this.#allIntentions.filter((intention) => {
            /* Check whether the intention is completed (true if the checkbox is checked) */
            const isCompleted = intention.isChecked;
            /* Check whether the intention belongs to the current filter (today or upcoming) */
            const matchesFilter = this.#matchesFilter(intention);
            /* Keep intentions that are not completed in the current filter
               So remove only intentions that are both completed and match the filter */
            return !(isCompleted && matchesFilter);
        });

        this.#allIntentions = remainingIntentions;
        this.#saveAllIntentions();
    }

    /* Sets an intention's completed status. Nothing physically moves since all intentions 
       shares one list. The getters place it in the active or completed list the next
       time they're read. */
    moveIntention(intentionId, newCompletedStatus) {
        const intention = this.findIntentionById(intentionId)
        intention.setCompletedStatus(newCompletedStatus);
        this.#saveAllIntentions();
    }
    
    createIntention(intentionEntries) {
        const intention = new Intention(intentionEntries);
        this.#allIntentions.push(intention);
        this.#saveAllIntentions();
    }

    findIntentionById(id) {
        const intention = this.#allIntentions.find((intention) => intention.id === id);
        return intention;
    }

    editIntention(id, intentionEntries) {
        const intention = this.findIntentionById(id);
        intention.applyUpdates(intentionEntries);
        this.#saveAllIntentions();
    }

    deleteIntention(id) {
        const intentionIndex = this.#allIntentions.findIndex((intention) => intention.id === id);
        this.#allIntentions.splice(intentionIndex, 1);
        this.#saveAllIntentions();
    }

    #saveAllIntentions() {
        localStorage.setItem("all-intentions", JSON.stringify(this.#allIntentions));
    }

    /* Loads the saved intentions (or starter data on the first use), rebuilds them
       as Intentions, and sets the filter to "today" */
    load() {
        this.#allIntentions = [];
        const savedAllIntentionData = localStorage.getItem("all-intentions")
        const intentionData = savedAllIntentionData === null ? starterData : JSON.parse(savedAllIntentionData);
        this.setFilter();
        intentionData.forEach((savedIntentionData) => {
            const intention = new Intention(savedIntentionData);
            this.#allIntentions.push(intention);
        })

        if (savedAllIntentionData === null) this.#saveAllIntentions();
    }
}

export default IntentionService;
