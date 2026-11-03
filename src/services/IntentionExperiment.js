import Intention from "../models/intention.js";
import { intentionStarterData } from "../starterData.js";
import { getCurrentDate } from "../utils/date.js";

class IntentionExperiment {
    #allIntentions = []

    /* Gets the number of intentions that are active in each category.
       The nav buttons need these numbers so they can show the current
       counts for today, upcoming and inbox */
    get getActiveCounts() {
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

    /* Returns all intentions that are still active.
       An intention is considered active when it is not completed.
       
       This includes today, upcoming, and inbox intentions.
       
       This will be used by Project service to group intentions under their
       designated project
    */
    get allActiveIntentions() {
        return this.#allIntentions.filter((intention) => {
            const isCompleted = !intention.isChecked;
            return isCompleted;
        });
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
