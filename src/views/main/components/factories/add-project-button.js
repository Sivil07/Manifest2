function renderAddProjectButton() {
    const addProject = document.createElement("button");
    addProject.classList.add("add-project")
    addProject.type = "button";
    addProject.textContent = "+ New Project";
    return addProject;
}

export {
    renderAddProjectButton
}
