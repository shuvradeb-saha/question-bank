import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChangeUser = e => {
    this.setState({ username: e.target.value });
  };

  onChangePass = e => {
    this.setState({ password: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('Values', this.state.username, this.state.password);

    fetch('http://localhost:1515/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: {
        username: this.state.username,
        password: this.state.password,
      },
    }).then(data => console.log(data));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User name"
            onChange={this.onChangeUser}
          />
          <br />
          <br />
          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={this.onChangePass}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;
