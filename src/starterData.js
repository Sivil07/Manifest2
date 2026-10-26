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
    }
]

export {
    starterActiveData,
    starterCompletedData
}
