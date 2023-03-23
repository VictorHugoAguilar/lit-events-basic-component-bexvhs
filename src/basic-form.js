import { LitElement, html, nothing } from 'lit-element';

import loginService from '../login-service.js';

class BasicForm extends LitElement {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      logged: { type: Boolean },
      error: { type: Boolean },
      _emailValid: { type: Boolean },
      _passwordValid: { type: Boolean },
      _activeSubmit: { type: Boolean },
      _showMessagePassword: { type: Boolean },
      _charging: { type: Boolean },
      _loadPercentage: { type: Number },
    };
  }

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.logged = false;
    this.error = false;
    this._activeSubmit = false;
    this._emailValid = false;
    this._passwordValid = false;
    this._showMessagePassword = false;
    this._charging = false;
    this._loadPercentage = 0;
  }

  createRenderRoot() {
    return this;
  }

  get loadingBar() {
    return this._charging
      ? html`
    <div class="progress">
      <div class="progress-bar" role="progressbar" 
        style="width: ${this._loadPercentage}%"
        aria-valuenow="${this._loadPercentage}" 
        aria-valuemin="0" 
        aria-valuemax="100"></div>
    </div> `
      : nothing;
  }

  get loginForm() {
    return html`
      <div class="card ">
        <h4
          class="d-flex align-items-center justify-content-center card-header bg-primary text-white "
        >
          Login
        </h4>
       ${this.loadingBar}
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              .value="${this.email}"
              @keyup="${(e) => {
                this.handleEmail(e.target.value);
              }}"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              .value="${this.password}"
              @keyup="${(e) => {
                this.handlePassword(e.target.value);
              }}"
              @blur="${(e) => this.checkLengthPassword()}"
            />
            ${
              this._showMessagePassword
                ? html`<small id="emailHelp" class="form-text text-muted"
                  >The password must contain 8 characters</small
                  >`
                : nothing
            } 
           
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button type="button" class="btn btn-primary" 
              ?disabled="${!this._isValidData}"
              @click="${(e) => this.handleSubmit()}"
            >Submit</button>
          </div>
        </div>
        
      </div>
    
      <br />
    `;
  }

  render() {
    return this.loginForm;
  }

  updated(changedProperties) {
    if (changedProperties && changedProperties.get('email')) {
      this._emailValid = this._valitateEmail(this.email);
    }
    if (changedProperties && changedProperties.get('password')) {
      this._passwordValid = this._validatePassword(this.password);
    }
  }

  handleEmail(value) {
    this.email = value;
  }

  handlePassword(value) {
    this.password = value;
  }

  handleSubmit() {
    this._charging = true;
    this._loadPercentage = 0;
    this.simulateCharge();

    loginService(this.email, this.password).then((login) => {
      if (login) {
        this.logged = true;
      } else {
        this.error = true;
      }
      this._charging = false;
      this.fireEvent();
    });
  }

  simulateCharge() {
    const interval = setInterval(() => {
      this._loadPercentage =
        this._loadPercentage < 100 ? (this._loadPercentage += 10) : 100;
    }, 150);
    setTimeout(() => clearInterval(interval), 2500);
  }

  _valitateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  _validatePassword(password) {
    return password?.length >= 8 || false;
  }

  get _isValidData() {
    return this._emailValid && this._passwordValid;
  }

  checkLengthPassword() {
    this._showMessagePassword = !this._validatePassword(this.password);
  }

  fireEvent() {
    this.dispatchEvent(
      new CustomEvent('login', {
        bubbles: true,
        composed: true,
        detail: {
          logged: this.logged,
          error: this.error,
        },
      })
    );
  }
}

customElements.define('basic-form', BasicForm);
