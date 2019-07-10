import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  static defaultProps = {
    username: 'Username',
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <Link className="navbar-brand" to="/">
            Question Bank Portal
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
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  {this.props.username}
                </span>
                <div className="dropdown-menu bg-dark">
                  <Link
                    to="/logout"
                    className="dropdown-item text-light dropdown-link"
                  >
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
