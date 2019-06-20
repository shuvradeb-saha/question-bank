import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { FormInput } from '../../components/FormComponent';
import { submitLoginInfo } from '../../state/login/action';

class Login extends Component {
  static propTypes = {
    submitLoginInfo: PropTypes.func,
  };

  onSubmit = values => {
    fetch('http://localhost:1515/auth', {
      method: 'POST',
      mode: 'cors', // no-cors, cors, *same-origin
      credentials: 'same-origin',
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer',
      body: JSON.stringify(values.toJS()),
    })
      .then(res => res.json())
      .then(response => console.log('Response ', response))
      .catch(() =>
        console.error('Please enter username and password correctly ')
      );

    //this.props.submitLoginInfo(values.toJS());
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
