function renderSpecificProjectHeader(titleText, projectColor) {
    const container = document.createElement("div");
    container.classList.add("project-header");

    const color = document.createElement("div");
    color.classList.add("project-color");
    color.style.backgroundColor = projectColor;
    container.appendChild(color)

    const h1 = document.createElement("h1");
    h1.textContent = titleText
    h1.classList.add("title")
    container.appendChild(h1);

    return container
}

export {
    renderSpecificProjectHeader
}
