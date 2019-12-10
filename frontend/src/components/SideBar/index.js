import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Roles } from 'containers/App/constants';
import { AccessDenied } from 'components';

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
    {/* <Link
      to="/profile"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-user fa-fw mr-3"></span>
        <span className="menu-collapsed">Profile</span>
      </div>
    </Link> */}
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

const HeadMasterSidebar = ({ roles }) => {
  const roleStr = roles.includes(Roles.MODERATOR)
    ? 'Headmaster | Moderator'
    : 'Headmaster';
  return (
    <ul className="list-group sticky-top sticky-offset">
      <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
        <b>
          <small>{roleStr}</small>
        </b>
      </li>

      {renderTeacherOptions()}
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
          to="/teacher/pending"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Unallocated list</span>
        </Link>
        <Link
          to="/teacher/approved"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Allocated list</span>
        </Link>
      </div>

      {roles.includes(Roles.MODERATOR) && renderModerationOption()}
      <a
        href="#download"
        data-toggle="collapse"
        aria-expanded="false"
        className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="fa fa-download mr-3"></span>
          <span className="menu-collapsed">Download</span>
          <span className="submenu-icon ml-auto"></span>
        </div>
      </a>
      <div id="download" className="collapse sidebar-submenu">
        <Link
          to="/download/paper"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Generate & Download</span>
        </Link>
        <Link
          to="/download/archive"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Download archive</span>
        </Link>
      </div>
    </ul>
  );
};

const renderTeacherOptions = () => (
  <span>
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
      to="/dashboard"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-user fa-fw mr-3"></span>
        <span className="menu-collapsed">Dashboard</span>
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
      to="/question/create"
      className="list-group-item list-group-item-action bg-dark text-white"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-plus-square fa-fw mr-3"></span>
        <span className="menu-collapsed">Create Question</span>
      </div>
    </Link>
    <a
      href="#submission-status"
      data-toggle="collapse"
      aria-expanded="true"
      className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-eye fa-fw mr-3"></span>
        <span className="menu-collapsed">Submission Status</span>
        <span className="submenu-icon ml-auto"></span>
      </div>
    </a>
    <div id="submission-status" className="collapse sidebar-submenu show">
      <a
        href="#mcq-status"
        data-toggle="collapse"
        aria-expanded="false"
        className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="menu-collapsed">MCQ Status</span>
          <span className="submenu-icon ml-auto"></span>
        </div>
      </a>
      <div id="mcq-status" className="collapse sidebar-submenu">
        <Link
          to="/question/mcq/pending"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Pending MCQ</span>
        </Link>
        <Link
          to="/question/mcq/approved"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Approved MCQ</span>
        </Link>
        <Link
          to="/question/mcq/rejected"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Rejected MCQ</span>
        </Link>
      </div>
      <a
        href="#cq-status"
        data-toggle="collapse"
        aria-expanded="false"
        className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="menu-collapsed">CQ Status</span>
          <span className="submenu-icon ml-auto"></span>
        </div>
      </a>
      <div id="cq-status" className="collapse sidebar-submenu">
        <Link
          to="/question/cq/pending"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Pending CQ</span>
        </Link>
        <Link
          to="/question/cq/approved"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Approved CQ</span>
        </Link>
        <Link
          to="/question/cq/rejected"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Rejected CQ</span>
        </Link>
      </div>
    </div>
  </span>
);

const TeacherSidebar = () => (
  <ul className="list-group sticky-top sticky-offset">
    <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
      <b>
        <small>Teacher</small>
      </b>
    </li>
    {renderTeacherOptions()}
  </ul>
);

const ModeratorSidebar = () => (
  <ul className="list-group sticky-top sticky-offset">
    <li className="list-group-item bg-info sidebar-separator-title d-flex align-items-center">
      <b>
        <small>Moderator</small>
      </b>
    </li>
    {renderTeacherOptions()}
    {renderModerationOption()}
  </ul>
);

const renderModerationOption = () => (
  <span>
    <a
      href="#moderate"
      data-toggle="collapse"
      aria-expanded="true"
      className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <span className="fa fa-list-alt mr-3"></span>

        <span className="menu-collapsed">Moderate Question</span>
        <span className="submenu-icon ml-auto"></span>
      </div>
    </a>

    <div id="moderate" className="collapse sidebar-submenu show">
      <a
        href="#cq"
        data-toggle="collapse"
        aria-expanded="false"
        className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="menu-collapsed">Creative Question</span>
          <span className="submenu-icon ml-auto"></span>
        </div>
      </a>
      <div id="cq" className="collapse sidebar-submenu">
        <Link
          to="/moderate/cq/pending"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Pending CQ</span>
        </Link>
        <Link
          to="/moderate/cq/approved"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Approved CQ</span>
        </Link>
        <Link
          to="/moderate/cq/rejected"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Rejected CQ</span>
        </Link>
      </div>
      <a
        href="#mcq"
        data-toggle="collapse"
        aria-expanded="false"
        className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-start align-items-center">
          <span className="menu-collapsed">Multiple Choice</span>
          <span className="submenu-icon ml-auto"></span>
        </div>
      </a>

      <div id="mcq" className="collapse sidebar-submenu">
        <Link
          to="/moderate/mcq/pending"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Pending MCQ</span>
        </Link>
        <Link
          to="/moderate/mcq/approved"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Approved MCQ</span>
        </Link>
        <Link
          to="/moderate/mcq/rejected"
          className="list-group-item list-group-item-action bg-dark text-white"
        >
          <span className="menu-collapsed">Rejected MCQ</span>
        </Link>
      </div>
    </div>
  </span>
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
        ) : roles.includes(Roles.HEADMASTER) ? (
          <HeadMasterSidebar roles={roles} />
        ) : roles.includes(Roles.MODERATOR) ? (
          <ModeratorSidebar />
        ) : roles.includes(Roles.TEACHER) ? (
          <TeacherSidebar />
        ) : (
          <AccessDenied />
        )}
      </div>
    );
  }
}

export default SideBar;
