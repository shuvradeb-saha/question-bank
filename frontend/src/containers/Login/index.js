import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';

import { FormInput } from '../../components';
import { submitLoginInfo } from '../../state/login/action';

class Login extends Component {
  static propTypes = {
    submitLoginInfo: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const userCredentials = localStorage.getItem('user_cred');
    console.log('usercred ', userCredentials);
    if (userCredentials) {
      console.log('usercred ', userCredentials);
      this.props.submitLoginInfo(userCredentials);
    }
  };

  onSubmit = values => {
    this.props.submitLoginInfo(values);
  };

  render() {
    const { handleSubmit } = this.props;
    /*  const userCredentials = localStorage.getItem('user_cred');
    if (userCredentials) {
      return <Redirect to="/homepage" />;
    } */

    return (
      <div className="container h-100">
        <div className="row align-items-center h-100" style={{ marginTop: 80 }}>
          <div className="col-6 mx-auto">
            <form className="jumbotron" onSubmit={handleSubmit(this.onSubmit)}>
              <h1 className="text-center">Login Here</h1>
              <FormInput name="username" label="Email" />
              <FormInput name="password" label="Password" />
              <div className="row">
                <div className="col-6 mx-auto">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
                <div className="col-6 mx-auto">
                  <Link to="/forget-password">Forgot password?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  submitLoginInfo: data => dispatch(submitLoginInfo(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  reduxForm({
    form: 'loginForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
  })
)(Login);
