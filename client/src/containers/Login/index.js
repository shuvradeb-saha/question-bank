import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FormInput } from '../../components/FormComponent';

class Login extends Component {
  static propTypes = {
    verifyLogin: PropTypes.func,
  };

  onSubmit = values => {
    console.log('values ', values.toJS());
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <FormInput name="username" label="Username" />
          <FormInput name="password" label="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  verifyLogin: data => dispatch(verifyLoginInfo(data)),
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
