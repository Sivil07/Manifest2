class Todo {
    constructor({ id = crypto.randomUUID(), title, reason }) {
        this.id = id;
        this.title = title;
        this.reason = reason;
    }

    updateTodo({ title, reason }) {
        this.title = title
        this.reason = reason;
    }
}

export default Todo;
