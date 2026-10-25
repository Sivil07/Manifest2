import { add, format } from "date-fns";

function getNextDay() {
    return add( new Date(), {
        days: 1
    });
}

function setMinDate() {
    const minDate = format( new Date(getNextDay()), "yyyy-LL-dd")
    return minDate;
}

export {
    setMinDate
}
