function renderProjectOption(optionName) {
    const option = document.createElement("option");
    option.textContent = optionName;
    option.value = optionName;
    return option;
}

export {
    renderProjectOption
}
