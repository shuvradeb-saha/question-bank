import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Roles } from 'containers/App/constants';

const AdminSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar">
    <div className="text-center bg-dark p-2">Admin</div>
    <ul className="nav nav-sidebar d-inline">
      <li className="dotted-border-bottom">
        <Link to="/">
          <i className="fa fa-home" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Home</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/profile">
          <i className="fa fa-user" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Profile</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/manage-user">
          <i className="fa fa-users" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Manage User</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/manage-institute">
          <i className="fa fa-university" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Manage Institute</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/manage-class">
          <i className="fa fa-address-card" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Manage Class</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/manage-subject">
          <i className="fa fa-book" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Manage Subject</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/manage-chapter">
          <i className="fa fa-object-group" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Manage Chapter</span>
        </Link>
      </li>
    </ul>
  </div>
);

const HeadMasterSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar">
    <div className="text-center bg-dark p-2">Headmaster</div>
    <ul className="nav nav-sidebar d-inline">
      <li className="dotted-border-bottom">
        <Link to="/">
          <i className="fa fa-home" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Home</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/profile">
          <i className="fa fa-user" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Profile</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/manage-teacher">
          <i className="fa fa-tasks" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Manage Teacher</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/create-question">
          <i className="fa fa-plus-square" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Create Question</span>
        </Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="/create-question">
          <i className="fa fa-eye" aria-hidden="true"></i>
          <span style={{ marginLeft: 10 }}>Question Status</span>
        </Link>
      </li>
    </ul>
  </div>
);

const TeacherSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar" id="Navbar">
    Teacher
    <ul className="nav nav-sidebar d-inline">
      <li className="active">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="../notes">Notes</Link>
      </li>
      <li>
        <Link to="../chat">Chat</Link>
      </li>
      <li>
        <Link to="../rss">RSS</Link>
      </li>
    </ul>
  </div>
);

const ModeratorSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar" id="Navbar">
    Moderator
    <ul className="nav nav-sidebar d-inline">
      <li className="active">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="../notes">Notes</Link>
      </li>
      <li>
        <Link to="../chat">Chat</Link>
      </li>
      <li>
        <Link to="../rss">RSS</Link>
      </li>
    </ul>
  </div>
);

class SideBar extends Component {
  static propTypes = {
    roles: PropTypes.any,
  };

  componentDidUpdate() {}

  render() {
    const { roles } = this.props;

    if (roles.includes(Roles.ADMIN)) {
      return <AdminSidebar />;
    } else if (roles.includes(Roles.MODERATOR)) {
      return <ModeratorSidebar />;
    } else if (roles.includes(Roles.HEADMASTER)) {
      return <HeadMasterSidebar />;
    } else if (roles.includes(Roles.TEACHER)) {
      return <TeacherSidebar />;
    } else {
      return <h1>Access Denied</h1>;
    }
  }
}

export default SideBar;
