function renderHeader() {
    const container = document.createElement("div");
    container.classList.add("header")

    const h2 = document.createElement("h1");
    h2.textContent = "Projects"
    h2.classList.add("title")
    container.appendChild(h2)

    const p = document.createElement("p");
    p.textContent = "Everything you intend.";
    p.classList.add("subtitle");
    container.appendChild(p)
    
    return container;
}

export {
    renderHeader
}
