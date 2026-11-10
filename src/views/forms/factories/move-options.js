function renderRadioInput(projectId, count, isCurrentProject) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = `radio-${count}`
    radio.setAttribute("part", "project-radio")
    radio.classList.add("highlight-radio")
    radio.name = "projectId"; // can throw an error if the Intention model "projectId" name is changed.
    radio.value = projectId;
    radio.checked = isCurrentProject // comes from renderProjectStatus (compares the specific intentionProjectId with the projectId from the array of projects)
    radio.required = true;
    return radio;
}

function renderProjectName(projectName) {
    const nameElement = document.createElement("p");
    nameElement.setAttribute("part", "move-project-name");
    nameElement.textContent = projectName
    return nameElement;
}

function renderProjectStatus(intentionProjectId, projectId) {
    const status = document.createElement("p");
    status.setAttribute("part", "project-status");

    const isCurrentProject = intentionProjectId === projectId;
    status.textContent = isCurrentProject ? "Current" : "";
    return { status, isCurrentProject }
}

function renderProjectColor(colorHexValue) {
    const projectColor = document.createElement("div");
    projectColor.setAttribute("part", "project-color");
    projectColor.style.backgroundColor = colorHexValue;
    return projectColor;
}


function renderProjectDetails(projectName, colorHexValue) {
    const projectDetails = document.createElement("div");
    const nameElement = renderProjectName(projectName);
    const projectColor = renderProjectColor(colorHexValue);

    projectDetails.setAttribute("part", "project-details");
    projectDetails.append(projectColor, nameElement);
    return projectDetails
}

function renderProjectOptionInfo(projectId, projectName, colorHexValue, count, isCurrentProject) {
    const projectOption = document.createElement("div");
    const projectDetails = renderProjectDetails(projectName, colorHexValue)
    const radio = renderRadioInput(projectId, count, isCurrentProject);

    projectOption.setAttribute("part", "project-option-info");
    projectOption.append(projectDetails, radio);
    return projectOption;
}

function renderProjectOption(projectId, intentionProjectId, projectName, colorHexValue, count) {
    const label = document.createElement("label");
    const statusObj = renderProjectStatus(intentionProjectId, projectId);

    const projectStatus = statusObj.status
    const projectOptionInfo = renderProjectOptionInfo(projectId, projectName, colorHexValue, count, statusObj.isCurrentProject);


    label.htmlFor = `radio-${count}`
    label.classList.add("highlight-label");
    label.setAttribute("part", "project-option");

    label.append(projectOptionInfo, projectStatus);
    return label;
}

export {
    renderProjectOption
}
