import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserAvatar from 'react-user-avatar';

class Header extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    profilePic: PropTypes.string,
  };

  static defaultProps = {
    username: 'Username',
  };
  //data:image/jpeg;base64,
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          <div className="qb-png"></div>
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          type="button"
          data-target="#colapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          id="colapsibleNavbar"
          className="collapse navbar-collapse justify-content-end"
        >
          <div className="text-light">
            <UserAvatar
              name={this.props.username}
              size="48"
              src={this.props.profilePic}
            />
          </div>
          &nbsp;
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle btn btn-outline-info"
                id="navbardrop"
                data-toggle="dropdown"
              >
                <i className="fa fa-user" aria-hidden="true"></i>
                &nbsp;&nbsp;
                {this.props.username}
              </span>
              <div className="dropdown-menu ">
                <button onClick={this.props.onLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
