import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Roles } from 'containers/App/constants';

const AdminSidebar = () => (
  <ul className="list-group sticky-top sticky-offset">
    <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
      <b>
        <small>Admin</small>
      </b>
    </li>

    <Link
      to="/"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-home fa-fw mr-3"></span>
        <span className="menu-collapsed">Home</span>
      </div>
    </Link>
    <Link
      to="/profile"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-user fa-fw mr-3"></span>
        <span className="menu-collapsed">Profile</span>
      </div>
    </Link>
    <Link
      to="/manage-user"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-users fa-fw mr-3"></span>
        <span className="menu-collapsed">Manage User</span>
      </div>
    </Link>
    <Link
      to="/manage-institute"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-university fa-fw mr-3"></span>
        <span className="menu-collapsed">Manage Institute</span>
      </div>
    </Link>
    <Link
      to="/manage-class"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-address-card fa-fw mr-3"></span>
        <span className="menu-collapsed">Manage Class</span>
      </div>
    </Link>
    <Link
      to="/manage-subject"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-book fa-fw mr-3"></span>
        <span className="menu-collapsed">Manage Subject</span>
      </div>
    </Link>
    <Link
      to="/manage-chapter"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-object-group fa-fw mr-3"></span>
        <span className="menu-collapsed">Manage Chapter</span>
      </div>
    </Link>
  </ul>
);

const HeadMasterSidebar = () => (
  <ul className="list-group sticky-top sticky-offset">
    <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
      <b>
        <small>Headmaster</small>
      </b>
    </li>

    <Link
      to="/"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-home fa-fw mr-3"></span>
        <span className="menu-collapsed">Home</span>
      </div>
    </Link>
    <Link
      to="/profile"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-user fa-fw mr-3"></span>
        <span className="menu-collapsed">Profile</span>
      </div>
    </Link>

    <a
      href="#teacher-list"
      data-toggle="collapse"
      aria-expanded="false"
      className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-tasks fa-fw mr-3"></span>
        <span className="menu-collapsed">Manage Teacher</span>
        <span className="submenu-icon ml-auto"></span>
      </div>
    </a>

    <div id="teacher-list" className="collapse sidebar-submenu">
      <Link
        to="/pending-teacher"
        className="list-group-item list-group-item-action bg-dark text-white"
      >
        <span className="menu-collapsed">Pending list</span>
      </Link>
      <Link
        to="/approved-teacher"
        className="list-group-item list-group-item-action bg-dark text-white"
      >
        <span className="menu-collapsed">Approved list</span>
      </Link>
    </div>
    <Link
      to="/create-question"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-plus-square fa-fw mr-3"></span>
        <span className="menu-collapsed">Create Question</span>
      </div>
    </Link>

    <Link
      to="/"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-eye fa-fw mr-3"></span>
        <span className="menu-collapsed">Question Status</span>
      </div>
    </Link>
  </ul>
);

const TeacherSidebar = () => (
  <ul className="list-group sticky-top sticky-offset">
    <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
      <b>
        <small>Teacher</small>
      </b>
    </li>

    <Link
      to="/"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-home fa-fw mr-3"></span>
        <span className="menu-collapsed">Home</span>
      </div>
    </Link>
  </ul>
);

const ModeratorSidebar = () => (
  <ul className="list-group sticky-top sticky-offset">
    <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
      <b>
        <small>Moderator</small>
      </b>
    </li>

    <Link
      to="/"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-home fa-fw mr-3"></span>
        <span className="menu-collapsed">Home</span>
      </div>
    </Link>
  </ul>
);

class SideBar extends Component {
  static propTypes = {
    roles: PropTypes.any,
  };

  componentDidUpdate() {}

  render() {
    const { roles } = this.props;
    return (
      <div
        id="sidebar-container"
        className="sidebar-expanded d-none d-md-block col-2 "
      >
        {roles.includes(Roles.ADMIN) ? (
          <AdminSidebar />
        ) : roles.includes(Roles.MODERATOR) ? (
          <ModeratorSidebar />
        ) : roles.includes(Roles.HEADMASTER) ? (
          <HeadMasterSidebar />
        ) : roles.includes(Roles.TEACHER) ? (
          <TeacherSidebar />
        ) : (
          <h1>Access Denied</h1>
        )}
      </div>
    );
  }
}

export default SideBar;
