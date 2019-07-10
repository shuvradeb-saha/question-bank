import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {Roles} from 'containers/App/constants';

const AdminSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar" id="Navbar">
    <div className="text-center bg-success p-2">Admin User</div>
    <ul className="nav nav-sidebar d-inline">
      <li className="dotted-border-bottom" >
        <Link to="/">Home</Link>
      </li>
      
      <li className="dotted-border-bottom">
        <Link to="../notes">Profile</Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="../chat">Manage User</Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="../rss">Manage Institute</Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="../rss">Manage Class</Link>
      </li>
      <li className="dotted-border-bottom">
        <Link to="../rss">Manage Subject</Link>
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

const HeadMasterSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar" id="Navbar">
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
  }

  componentDidUpdate() {
    console.log("cdu ",this.props.roles);
  }

  render() {
    const {roles} = this.props;

    console.log(roles);

    if (roles.includes(Roles.ADMIN)) {
      return <AdminSidebar />;
    } else if (roles.includes(Roles.MODERATOR)) {
      return <ModeratorSidebar />;
      
    } else if (roles.includes(Roles.HEADMASTER)) {
      return <HeadMasterSidebar />;
    } else if(roles.includes(Roles.TEACHER)){
      return <TeacherSidebar />;
    }else {
      return (<h1>Access Denied</h1>);
    }
  }
}

export default SideBar;
