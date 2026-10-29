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

export {
    setMinDate,
    getCompletedByDayOfWeek,
    getCurrentDate,
    getPreviousDay
}
