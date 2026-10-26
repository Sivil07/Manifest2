import { setMinDate } from "./utils/date.js"

const starterActiveData = [
    {
        title: "Finish the Todo app layout",
        reason: "Get one real project into my portfolio",
        isChecked: false,
        dueDate: setMinDate()
    },
    {
        title: "Draft the project proposal",
        reason: "Turn the idea in my notes into a plan",
        isChecked: false,
        dueDate: setMinDate()
    },
    {
        title: "Review weekly expenses",
        reason: "To stay aware of spending habits and keep expenses low",
        isChecked: false,
        dueDate: "2026-10-26"
    }
]

const starterCompletedData = [
    {
        title: "Pay the bills",
        reason: "Handle the monthly payments",
        isChecked: true,
        dueDate: setMinDate()
    },
    {
        title: "Buy groceries",
        reason: "To meal prep for this week",
        isChecked: true,
        dueDate: setMinDate()
    },
    {
        title: "Review yesterday's lecture notes",
        reason: "Strengthen understanding before moving on",
        isChecked: true,
        dueDate: "2026-10-26"
    }
]

export {
    starterActiveData,
    starterCompletedData
}
