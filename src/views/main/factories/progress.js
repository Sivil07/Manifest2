/* Progress card factories */

function renderProgressContainer(count, maxCount) {
    const progressContainer = document.createElement("div");
    const progressBar = document.createElement("progress");

    progressContainer.classList.add("progress-container");

    progressBar.classList.add("progress-bar");
    progressBar.value = count;
    progressBar.max = maxCount;

    progressContainer.appendChild(progressBar);
    return progressContainer;
}

function renderProgressTagline() {
    const tagLine = document.createElement("p");
    tagLine.classList.add("progress-tagline");
    tagLine.textContent = "Turn intentions into actions."
    return tagLine;
}

function renderProgressText(count, maxCount) {
    const progressText = document.createElement("p");
    progressText.classList.add("progress-text")
    progressText.textContent = `${count} of ${maxCount} manifested`;
    return progressText;
}

function renderProgressContents(count, maxCount) {
    const progressContents = document.createElement("div");
    const progressTagline = renderProgressTagline();
    const progressText = renderProgressText(count, maxCount);
    const progressContainer = renderProgressContainer(count, maxCount);

    progressContents.classList.add("progress-contents");
    progressContents.append( progressTagline, progressText, progressContainer);
    return progressContents;
}

/* Builds a progress card showing the user's daily intention progress. */
function buildProgressCard(count, maxCount) {
    const progressCard = document.createElement("div");
    const progressContents = renderProgressContents(count, maxCount);
    
    progressCard.classList.add("progress-card");
    progressCard.appendChild(progressContents);
    return progressCard;
}

export {
    buildProgressCard
}

