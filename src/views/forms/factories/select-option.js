
/* Creates a select option for the IntentionForm project dropdown. */
function renderProjectOption(optionData) {
    const option = document.createElement("option");
    option.textContent = optionData.projectName;
    option.value = optionData.projectId;
    return option;
}

export {
    renderProjectOption
}
