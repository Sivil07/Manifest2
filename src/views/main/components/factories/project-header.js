function renderHeader() {
    const container = document.createElement("div");
    container.classList.add("header")

    const p = document.createElement("p");
    p.textContent = "Everything you intend.";
    p.classList.add("subtitle");
    container.appendChild(p)

    const h2 = document.createElement("h1");
    h2.textContent = "Projects"
    h2.classList.add("title")
    container.appendChild(h2)

    return container;
}

export {
    renderHeader
}
