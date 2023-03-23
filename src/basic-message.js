import { LitElement, html } from 'lit-element';

class BasicMessage extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      textButton: { type: String },
      text: { type: String },
      eventName: { type: String },
    };
  }

  constructor() {
    super();
    this.type = '';
    this.textButton = '';
    this.eventName = '';
    this.text = '';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div class="alert alert-${this.type}" role="alert">
      ${this.text}
      <br />
      <br />
      <div class="d-flex align-items-center justify-content-center">
        <button type="button" class="btn btn-${this.type}"
        @click="${() => this.fireEvent()}"
        >${this.textButton}</button>
      </div>
    </div>
    `;
  }

  get styleButton() {
    return `btn-${this.type}`;
  }
  get styleAlert() {
    return `alert-${this.type}`;
  }

  fireEvent() {
    this.dispatchEvent(
      new CustomEvent(this.eventName, {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('basic-message', BasicMessage);
