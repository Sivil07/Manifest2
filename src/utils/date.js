import { add, format } from "date-fns";

function getNextDay() {
    return add( new Date(), {
        days: 1
    });
}

function getPreviousDay() {
    const previousDay = add( new Date(), {days: -1});
    return format( new Date(previousDay), "yyyy-MM-dd" )
}

function setMinDate() {
    const minDate = format( new Date(getNextDay()), "yyyy-LL-dd")
    return minDate;
}

function getCompletedByDayOfWeek(completedDate) {
    const day = format( new Date(completedDate), "EEE"  )
    return day;
}

function getCurrentDate() {
    return format( new Date(), "yyyy-MM-dd");
}

function getWelcomeDate() {
    return format( new Date(), "EEEE, LLL L" );
} 

function getDayPeriod() {
    return format( new Date(), "BBBB")
}

function getWelcomeMessage() {
    const dayPeriod = getDayPeriod()
    const message = getGreetingForDayPeriod(dayPeriod)
    return message;
}


function getGreetingForDayPeriod(dayPeriod) {
    let welcomeMessage;
    switch(dayPeriod) {
        case "in the morning":
            welcomeMessage = "Good Morning"
            break;
        case "in the afternoon":
            welcomeMessage = "Good Afternoon"
            break;
        case "in the evening":
        case "at night":
            welcomeMessage = "Good Evening"
            break
        default:
            welcomeMessage = "Welcome"
    }
    return welcomeMessage;
}

export {
    setMinDate,
    getCompletedByDayOfWeek,
    getCurrentDate,
    getPreviousDay,
    getWelcomeDate,
    getWelcomeMessage
}
