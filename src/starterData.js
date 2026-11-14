import { setMinDate, getCurrentDate, getPreviousDay } from "./utils/date.js"

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
    {
        title: "Organize project files",
        reason: "Make it easier to navigate the codebase",
        isChecked: true,
        dueDate: getCurrentDate(),
        description: "",
        createdAt: getCurrentDate(),
        projectId: "p2"
    },
    {
        title: "Prepare a monthly savings plan",
        reason: "Build better habits around managing money",
        isChecked: false,
        dueDate: getCurrentDate(),
        description: "Review monthly expenses and decide how much to set aside for savings.",
        createdAt: getCurrentDate(),
        projectId: "p1"
    },
    {
        title: "Plan the next portfolio project",
        reason: "Continue building practical development experience",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Brainstorm a few project ideas, compare their features, and choose one to work on next.",
        createdAt: getPreviousDay(),
        projectId: "p4"
    },
    {
        title: "Research local professional events",
        reason: "Find opportunities to meet people and learn",
        isChecked: true,
        dueDate: setMinDate(),
        description: "",
        createdAt: getPreviousDay(),
        projectId: "p4"
    },
    {
        title: "Explore volunteer opportunities",
        reason: "Find ways to contribute and connect with others",
        isChecked: true,
        dueDate: getCurrentDate(),
        description: "Look into local organizations and review the types of volunteer opportunities they offer.",
        createdAt: getCurrentDate(),
        projectId: ""
    },
    {
        title: "Research online learning resources",
        reason: "Find useful ways to keep developing new skills",
        isChecked: false,
        dueDate: setMinDate(),
        description: "",
        createdAt: getPreviousDay(),
        projectId: ""
    },
    {
        title: "Look into a new hobby",
        reason: "Make time for something outside my usual routine",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Explore a few activities that seem interesting and consider which ones would be worth trying.",
        createdAt: getPreviousDay(),
        projectId: ""
    },
    {
        title: "Create a list of books to read",
        reason: "Make more time for reading",
        isChecked: true,
        dueDate: getCurrentDate(),
        description: "",
        createdAt: getPreviousDay(),
        projectId: ""
    },
    {
        title: "Organize study notes",
        reason: "Make important concepts easier to revisit",
        isChecked: true,
        dueDate: getCurrentDate(),
        description: "",
        createdAt: getPreviousDay(),
        projectId: "p2"
    },
    {
        title: "Study object-oriented programming",
        reason: "Improve how I structure and organize code",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Review classes, inheritance, encapsulation, and polymorphism, then practice applying them in small exercises.",
        createdAt: getPreviousDay(),
        projectId: "p2"
    },
    {
        title: "Practice algorithm complexity analysis",
        reason: "Understand the efficiency of different solutions",
        isChecked: false,
        dueDate: setMinDate(),
        description: "Analyze time and space complexity for common loops, array operations, and search algorithms.",
        createdAt: getPreviousDay(),
        projectId: "p2"
    }
]

const projectStarterData = [
    {
        id: "p4",
        projectName: "Personal",
        projectColor: "#8B5CF6"
    },
    {
        id: "p1",
        projectName: "Finance",
        projectColor: "#14B8A6"
    },
    {
        id: "p2",
        projectName: "School",
        projectColor: "#3B82F6"
    }
]

export {
    intentionStarterData,
    projectStarterData
}
