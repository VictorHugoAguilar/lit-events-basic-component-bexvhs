import { LitElement, html, nothing } from 'lit-element';

import './src/basic-message.js';
import './src/basic-form.js';

class BasicElement extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      logged: { type: Boolean },
      error: { type: Boolean },
      // _eventLogin: {},
      // _eventRetry: {},
      // _eventLogout: {},
    };
  }

  constructor() {
    super();
    this.name = '';
    this.logged = false;
    this.error = false;
  }

  connectedCallback() {
    super.connectedCallback();

    // this._eventLogin = this.handleLogin.bind(this);
    // this._eventRetry = this.handleRetry.bind(this);
    // this._eventLogout = this.handleLogout.bind(this);

    // this.addEventListener('login', this._eventLogin);
    // this.addEventListener('retry', this._eventRetry);
    // this.addEventListener('logout', this._eventLogout);
  }

  disconnectedCallback() {
    // this.removeEventListener('login', this._eventLogin);
    // this.removeEventListener('retry', this._eventRetry);
    // this.removeEventListener('logout', this._eventLogout);
    super.disconnectedCallback();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    if (this.logged) {
      return html`<basic-message
      type="success" 
      textButton="logut" 
      text="Bienvenido ${this.name}"
      eventName="logout"
      @logout="${this.handleLogout}"
    ></basic-message>`;
    }
    if (this.error) {
      return html`
      <basic-message 
        type="danger" 
        textButton="reintentar" 
        text="password incorrecto, intenta de nuevo"
        eventName="retry"
        @retry="${this.handleRetry}"
      ></basic-message>`;
    }
    return html`
      <basic-form @login="${this.handleLogin}"></basic-form>
    `;
  }

  handleLogout() {
    this.logged = false;
    this.email = '';
    this.password = '';
  }

  handleRetry() {
    this.error = false;
    this.password = '';
  }

  handleLogin({ detail }) {
    this.logged = detail.logged;
    this.error = detail.error;
  }
}

customElements.define('basic-element', BasicElement);
