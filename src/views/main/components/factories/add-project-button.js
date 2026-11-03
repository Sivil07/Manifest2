function renderAddProjectButton() {
    const addProject = document.createElement("button");
    addProject.type = "button";
    addProject.textContent = "Add Project";
    return addProject;
}

export {
    renderAddProjectButton
}
