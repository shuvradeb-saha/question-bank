import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { userIsNotAuthenticated } from 'utils/reduxAuth';
import { FormInput } from 'components';
import { submitLoginInfo } from 'state/login/action';

class Login extends Component {
  static propTypes = {
    submitLoginInfo: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: { message: '' },
  };

  onSubmit = values => {
    this.props.submitLoginInfo(values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container h-100" style={{ marginTop: 80 }}>
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            <form className="jumbotron" onSubmit={handleSubmit(this.onSubmit)}>
              <div className="row mb-1">
                <span className="m-auto qb-png"></span>
              </div>
              <h2 className="text-center">Login</h2>
              <FormInput name="username" label="Email" type="email" />
              <FormInput name="password" label="Password" type="password" />
              <div className="row">
                <div className="col-6 mx-auto">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
                <div className="col-6 mx-auto">
                  <Link to="/forget/password">Forgot password?</Link>
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
  userIsNotAuthenticated,
  withConnect,
  reduxForm({
    form: 'loginForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
  })
)(Login);
