import React, { Component } from 'react';
import API from 'utils/api';
import { toastSuccess, toastError } from 'components/Toaster';

class OtpSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: true,
      otpForm: false,
      resetForm: false,
      email: '',
      otpCode: '',
      newPassword: '',
      confPassword: '',
    };

    this.onSendOtp = this.onSendOtp.bind(this);
    this.onVerifyOtp = this.onVerifyOtp.bind(this);
    this.onResetInfoSubmit = this.onResetInfoSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async onSendOtp(e) {
    e.preventDefault();

    const uri = `/api/otp/send`;
    const data = { email: this.state.email };
    try {
      const res = await API.post(uri, data);
      toastSuccess(res);
      this.setState({ sendForm: false, otpForm: true });
    } catch (error) {
      console.log('Error email submit', error);
      toastError(error.response.data.message);
    }
  }

  async onVerifyOtp(e) {
    e.preventDefault();
    const uri = `/api/otp/verify`;
    const data = { email: this.state.email, otpCode: this.state.otpCode };
    try {
      const res = await API.post(uri, data);
      toastSuccess(res);
      this.setState({ sendForm: false, otpForm: false, resetForm: true });
    } catch (error) {
      console.log('Error', error);
      toastError(error.response.data);
    }
  }

  async onResetInfoSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const uri = `/api/reset/password`;

    const data = {
      email: email,
      newPassword: this.state.newPassword,
      confPassword: this.state.confPassword,
    };
    try {
      const res = await API.post(uri, data);
      toastSuccess(res);
      this.setState({ sendForm: false, otpForm: false, resetForm: true });
      this.props.history.push('/');
    } catch (error) {
      console.log('Error in otp send', error);
      toastError(error.response.data);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  openSendForm = () => {
    this.setState({ sendForm: true, otpForm: false });
  };

  render() {
    const { sendForm, otpForm, resetForm } = this.state;
    return (
      <div className="row m-auto">
        <div className="col-4"></div>
        <div className="col-4">
          <div className="row p-2">
            <span className="m-auto qb-png"></span>
          </div>
          <div className="row card p-2">
            {sendForm && (
              <div className="form-group p-2">
                <form onSubmit={this.onSendOtp}>
                  <label htmlFor="email">
                    Enter your user account's verified email address and we will
                    send you a password reset otp.
                  </label>
                  <input
                    required
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    onChange={this.handleInputChange}
                  />

                  <button className="btn btn-primary">Send Otp</button>
                </form>
              </div>
            )}
            {otpForm && (
              <div className="form-group p-2">
                <form onSubmit={this.onVerifyOtp}>
                  <label htmlFor="email">
                    Enter the otp code sent to your given email.
                  </label>
                  <input
                    required
                    name="otpCode"
                    className="form-control"
                    type="text"
                    placeholder="Enter Otp Code"
                    onChange={this.handleInputChange}
                  />

                  <button type="submit" className="btn btn-primary">
                    Submit Otp
                  </button>
                  <button onClick={this.openSendForm} className="btn btn-dark">
                    Re-send Otp
                  </button>
                </form>
              </div>
            )}
            {resetForm && (
              <div className="form-group p-2">
                <form onSubmit={this.onResetInfoSubmit}>
                  <label htmlFor="newPassword">Enter New Password</label>
                  <input
                    required
                    name="newPassword"
                    className="form-control"
                    type="password"
                    placeholder="New Password"
                    onChange={this.handleInputChange}
                  />

                  <label htmlFor="confPassword">Enter Confirm Password</label>
                  <input
                    required
                    name="confPassword"
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleInputChange}
                  />

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OtpSend;
