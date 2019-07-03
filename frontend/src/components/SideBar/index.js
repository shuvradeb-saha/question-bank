import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => (
  <div className="col-sm-3 col-md-2 sidebar" id="Navbar">
    Admin
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
  render() {
    const role = 'MODERATOR';

    if (role === 'ADMIN') {
      return <AdminSidebar />;
    } else if (role === 'TEACHER') {
      return <TeacherSidebar />;
    } else if (role === 'MODERATOR') {
      return <ModeratorSidebar />;
    } else {
      return <HeadMasterSidebar />;
    }
  }
}

export default SideBar;
