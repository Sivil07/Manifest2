import { setMinDate, getCurrentDate, getPreviousDay } from "./utils/date.js"

const starterData = [
    {
        title: "Finish the Todo app layout",
        reason: "Get one real project into my portfolio",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Refine the layout structure, organize components, and ensure the interface looks polished.",
        createdAt: getCurrentDate()
    },
    {
        title: "Draft the project proposal",
        reason: "Turn the idea in my notes into a plan",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Outline the project goals, define the timeline, and organize the main requirements clearly",
        createdAt: getCurrentDate()
    },
    {
        title: "Review weekly expenses",
        reason: "To stay aware of spending habits and keep expenses low",
        isChecked: false,
        dueDate: getCurrentDate(),
        description: "Check receipts and statements, categorize purchases, and identify spending patterns to adjust.",
        createdAt: getPreviousDay()
    },
    {
        title: "Pay the bills",
        reason: "Handle the monthly payments",
        isChecked: true,
        dueDate: setMinDate(),
        description: "Review monthly statements, confirm amounts due, and submit payments to keep accounts current.",
        createdAt: getCurrentDate()
    },
    {
        title: "Buy groceries",
        reason: "To meal prep for this week",
        isChecked: true,
        dueDate: setMinDate(),
        description: "Review the weekly meal plan, list needed ingredients, and pick up items required for meal prep.",
        createdAt: getCurrentDate()
    },
    {
        title: "Review yesterday's lecture notes",
        reason: "Strengthen understanding before moving on",
        isChecked: true,
        dueDate: getCurrentDate(),
        description: "Read through the lecture notes again, highlight key concepts, and reinforce the material learned.",
        createdAt: getPreviousDay()
    }
]

const intentionStarterData = [
    {
        title: "Finish the Todo app layout",
        reason: "Get one real project into my portfolio",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Refine the layout structure, organize components, and ensure the interface looks polished.",
        createdAt: getCurrentDate(),
        projectId: "p4"
    },
    {
        title: "Review yesterday's lecture notes",
        reason: "Strengthen understanding before moving on",
        isChecked: true,
        dueDate: getCurrentDate(),
        description: "Read through the lecture notes again, highlight key concepts, and reinforce the material learned.",
        createdAt: getPreviousDay(),
        projectId: "p4"
    },
    {
        title: "Review weekly expenses",
        reason: "To stay aware of spending habits and keep expenses low",
        isChecked: false,
        dueDate: getCurrentDate(),
        description: "Check receipts and statements, categorize purchases, and identify spending patterns to adjust.",
        createdAt: getPreviousDay(),
        projectId: "p1"
    },
    {
        title: "Buy groceries",
        reason: "To meal prep for this week",
        isChecked: true,
        dueDate: setMinDate(),
        description: "Review the weekly meal plan, list needed ingredients, and pick up items required for meal prep.",
        createdAt: getCurrentDate(),
        projectId: "p1"
    },
    {
        title: "Draft the project proposal",
        reason: "Turn the idea in my notes into a plan",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Outline the project goals, define the timeline, and organize the main requirements clearly",
        createdAt: getCurrentDate(),
        projectId: ""
    },
]

const projectStarterData = [
    {
        projectId: "p4",
        projectName: "Personal"
    },
    {
        projectId: "p1",
        projectName: "Finance"
    }
]

export {
    starterData,
    intentionStarterData,
    projectStarterData
}
