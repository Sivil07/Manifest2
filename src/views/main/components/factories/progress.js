function renderProgressContainer() {
    const progressContainer = document.createElement("div");
    const progressBar = document.createElement("progress");

    progressContainer.classList.add("progress-container");

    progressBar.classList.add("progress-bar");
    progressBar.value = 3;
    progressBar.max = 7;

    progressContainer.appendChild(progressBar);
    return progressContainer;
}

function renderProgressTagline() {
    const tagLine = document.createElement("p");
    tagLine.classList.add("progress-tagline");
    tagLine.textContent = "Turn intentions into actions."
    return tagLine;
}

function renderProgressText() {
    const progressText = document.createElement("p");
    progressText.classList.add("progress-text")
    progressText.textContent = "3 of 7 manifested";
    return progressText;
}

function renderProgressContents() {
    const progressContents = document.createElement("div");
    const progressTagline = renderProgressTagline();
    const progressText = renderProgressText();
    const progressContainer = renderProgressContainer();

    progressContents.classList.add("progress-contents");
    progressContents.append( progressTagline, progressText, progressContainer);
    return progressContents;
}

function buildProgressCard() {
    const progressCard = document.createElement("div");
    const progressContents = renderProgressContents();
    
    progressCard.classList.add("progress-card");
    progressCard.appendChild(progressContents);
    return progressCard
}

export {
    buildProgressCard
}

