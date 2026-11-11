import Intention from "../models/intention.js";
import { intentionStarterData } from "../starterData.js";
import { getCurrentDate } from "../utils/date.js";

class IntentionExperiment {
    #allIntentions = []

    /* Defines which group the user is viewing. Either "today" or "upcoming" */
    currentFilter;

    dailyMaxCount = 7

    /* Calculates the number of intentions created for the current day */
    get dailyCount() {
        let count = 0
        this.#allIntentions.forEach((intention) => {
            const isCreatedToday = intention.createdAt === getCurrentDate();
            if (isCreatedToday) count++
        });

        return count;
    }

    /* Gets the number of intentions that are active in each category.
       The nav buttons need these numbers so they can show the current
       counts for today, upcoming and inbox */
    get navActiveCounts() {
        const todayIntentions = this.#allIntentions.filter((intention) => {
            const isToday = intention.dueDate === getCurrentDate();
            const isCompleted = !intention.isChecked;
            return isToday && isCompleted;
        });

        const upcomingIntentions = this.#allIntentions.filter((intention) => {
            const isUpcoming = intention.dueDate !== getCurrentDate();
            const isCompleted = !intention.isChecked;
            return isUpcoming && isCompleted;
        });

        const inboxIntentions = this.#allIntentions.filter((intention) => {
            const isInbox = intention.projectId === "";
            return isInbox;
        });

        return {
            todayCount: todayIntentions.length,
            upcomingCount: upcomingIntentions.length,
            inboxCount: inboxIntentions.length
        }
    }

    get filteredActiveIntentions() {
        return this.#allIntentions.filter((intention) => {
            const matchesCurrentFilter = this.#matchesFilter(intention);
            const isCompleted = !intention.isChecked;
            return matchesCurrentFilter && isCompleted;
        })
    }

    get filteredCompletedIntentions() {
        return this.#allIntentions.filter((intention) => {
            const matchesCurrentFilter = this.#matchesFilter(intention);
            const isCompleted = intention.isChecked;
            return matchesCurrentFilter && isCompleted;
        })
    }

    /* Returns all intentions that are still active.
       An intention is considered active when it is not completed.
       
       This includes today, upcoming, and inbox intentions.
       
       This will be used by Project service to group intentions under their
       designated project
    */
    get unfilteredActiveIntentions() {
        return this.#allIntentions.filter((intention) => {
            const isCompleted = !intention.isChecked;
            return isCompleted;
        });
    }

    /* Determines whether an intention belongs to the active page the user is on.
       The matching logic varies depending on the current filter selected by the 
       user (today, upcoming, inbox or specific project) */
    #matchesFilter(intention, projectId = null) {
        const today = getCurrentDate();
        if (this.currentFilter === "today") return intention.dueDate === today && intention.projectId !== "";
        if (this.currentFilter === "upcoming") return intention.dueDate !== today && intention.projectId !== "";
        if (this.currentFilter === "inbox") return intention.projectId === "";

        /* Used when the user is on a specific project page.
           The general projects page does not display intentions or allow intentions
           to be cleared, so the check logic is not needed besides this one for
           specific project pages. */
        return intention.isChecked && intention.projectId == projectId
    }

    /* Chooses which group of intentions are shown */
    setFilter(filterOption = "today") {
        this.currentFilter = filterOption
    }

    /* Returns all intentions for a specific project that's filtered by
       their completed status.

       Passing "active" returns all unchecked intentions for a specified 
       project

       Passing "completed" returns all checked intentions for a specified
       project.

       This is used when rendering a specific project so that active and 
       completed intentions can be displayed in separate sections of the page.
    */
    getIntentionsByProjectIdAndType(type, projectId) {
        const isActive = (intention) => (!intention.isChecked && intention.projectId === projectId)
        const isCompleted = (intention) => (intention.isChecked && intention.projectId === projectId)

        if (type === "active") return this.#allIntentions.filter(isActive);
        if (type === "completed") return this.#allIntentions.filter(isCompleted);
    }


    /* Removes completed intentions that match the currently active view.
       This can be a standard filter (today/upcoming/inbox) or a specific project. */
    clearCompletedIntentions(projectId = null) {
        /* Checks for whether the intentions is completed and belongs
           to the current filter. */
        const isCompletedAndMatchesFilter = (intention) => (intention.isChecked && this.#matchesFilter(intention, projectId));

        /* Keep intentions that do not match the completed criteria.
           So remove only intentions that are both completed and match the filter. */
        const remainingIntentions = this.#allIntentions.filter((intention) => !isCompletedAndMatchesFilter(intention));

        this.#allIntentions = remainingIntentions;
        this.#saveAllIntentions();
    }

    // getIntentionsByProjectId(projectId) {
    //     const intentions = this.#allIntentions.filter((intention) => intention.projectId === projectId);
    //     return intentions;
    // }

    moveIntention({ intentionId, projectId, newCompletedStatus }) {
        const intention = this.findIntentionByIdAndProjectId(intentionId, projectId);
        intention.setCompletedStatus(newCompletedStatus);
        this.#saveAllIntentions();
    }


    findIntentionById(id) {
        const intention = this.#allIntentions.find((intention) => intention.id === id);
        return intention;
    }

    findIntentionByIdAndProjectId(id, projectId) {
        const findIntention = (intention) => (intention.id === id && intention.projectId === projectId);
        const intention = this.#allIntentions.find(findIntention);
        return intention;
    }

    createIntention(intentionEntries) {
        const intention = new Intention(intentionEntries);
        this.#allIntentions.push(intention);
        this.#saveAllIntentions();
    }

    editIntention(id, intentionEntries) {
        const intention = this.findIntentionById(id);
        intention.applyUpdates(intentionEntries);
        this.#saveAllIntentions();
    }

    moveIntentionToProject(id, projectId) {
        const intention = this.findIntentionById(id);
        intention.moveToProject(projectId);
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

    /* Loads the saved intentions (or starter data on the first use) and rebuilds them
   as Intentions  */
    loadIntentions() {
        this.#allIntentions = [];
        const savedAllIntentionData = localStorage.getItem("all-intentions")
        const intentionData = savedAllIntentionData === null ? intentionStarterData : JSON.parse(savedAllIntentionData);
        intentionData.forEach((savedIntentionData) => {
            const intention = new Intention(savedIntentionData);
            this.#allIntentions.push(intention);
        })

        if (savedAllIntentionData === null) this.#saveAllIntentions();
    }

}

export default IntentionExperiment;
