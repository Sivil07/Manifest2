function renderPageLabel(pageName) {
    const pageLabel = document.createElement("h2");
    pageLabel.classList.add("title");
    pageLabel.textContent = pageName;
    return pageLabel;
}

function renderHeader(titleText, subtitleText) {
    const container = document.createElement("div");
    container.classList.add("header")

    if (subtitleText) {
        const subtitle = document.createElement("p");
        subtitle.textContent = subtitleText
        subtitle.classList.add("subtitle");
        container.appendChild(subtitle);
    }

    const pageLabel = renderPageLabel(titleText);
    container.appendChild(pageLabel);

    return container;
}

function renderSpecificProjectHeader(titleText, projectColor) {
    const container = document.createElement("div");
    container.classList.add("project-header");

    const color = document.createElement("div");
    color.classList.add("project-color");
    color.style.backgroundColor = projectColor;
    container.appendChild(color)

    const pageLabel = renderPageLabel(titleText);

    container.appendChild(pageLabel);

    return container
}


export {
    renderHeader,
    renderSpecificProjectHeader
}
