import React, { Component } from 'react';

class Login extends Component {
  onSubmit = values => {
    console.log('values ', values);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="username" placeholder="User name" />
          <br />
          <br />
          <input type="text" name="password" placeholder="Password" />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
