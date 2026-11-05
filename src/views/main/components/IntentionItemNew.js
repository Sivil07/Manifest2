const template = document.createElement("template");
template.innerHTML = `
<div part="intention-contents">
    <label for="intention-check" part="intention-label">
        <input id="intention-check" type="checkbox" part="input-check">
    </label>
    <button type="button" part="intention-text">
        <p part="intention-title">Commit Project</p>
        <p part="intention-reason">I want To Be Able To fly</p>
    </button>
    <div part="intention-tags">
        <p part="tag project-name">Work</p>
        <p part="tag due-date">Fri - Nov 3rd</p>
    </div>
</div>
`

class IntentionItemNew extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(template.content.cloneNode(true));
    }

    set intentionData(data) {

    }
}


customElements.define("intention-item", IntentionItemNew);
