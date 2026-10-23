class Todo {
    constructor({ id = crypto.randomUUID(), title, reason, isChecked = false }) {
        this.id = id;
        this.title = title;
        this.reason = reason;
        this.isChecked = isChecked;
    }

    updateTodo({ title, reason }) {
        this.title = title
        this.reason = reason;
    }

    updateChecked(checkedData) {
        this.isChecked = checkedData;
    }
}

export default Todo;
