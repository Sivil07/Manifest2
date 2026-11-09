const template = document.createElement("template");
template.innerHTML = `
<div part="progress-contents">
    <p part="progress-tagline">Turn intentions into action.</p>
    <p part="progress-text">3 of 7 manifested</p>
    <div part="progress-container">
        <progress part="progress-bar" value="1" max="7"></progress>
    </div>
</div>
`

class IntentionProgress extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set progress({ count, maxCount }) {
        const progressBar = this.shadowRoot.querySelector(`[part="progress-bar"]`);
        const progressText = this.shadowRoot.querySelector(`[part="progress-text"]`);
        progressBar.max = maxCount;
        progressBar.value = count;
        progressText.textContent = `${count} of ${maxCount} manifested`
    }

}

customElements.define("intention-progress", IntentionProgress);
