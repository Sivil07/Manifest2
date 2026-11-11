function renderSection(className) {
    const projectSection = document.createElement("section");
    projectSection.classList.add(className)
    return projectSection;
}

export {
    renderSection
}
