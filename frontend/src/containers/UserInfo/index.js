/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';
import { change } from 'redux-form';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import { UserRegisterModal } from 'components/Modals';
import { Roles } from 'containers/App/constants';
import {
  fetchAllRoles,
  fetchEiinNumbers,
  fetchNewPassword,
  fetchUsers,
  fetchUser,
  saveUser,
} from 'state/admin/action';
import { createStructuredSelector } from 'reselect';
import {
  makeAllRoles,
  makeAllEiinNumbers,
  makeAllUsers,
  makeNewPassword,
  makeInProgress,
  makeUserDetails,
} from 'state/admin/selectors';

import API from 'utils/api';
import { toastSuccess, toastError } from 'components/Toaster';

const ActionType = {
  remove: 'remove',
  add: 'add',
};

class UserInfo extends Component {
  static propTypes = {
    allRoles: PropTypes.object,
    allEiinNumbers: PropTypes.object,
    allUsers: PropTypes.object,
    fetchRoles: PropTypes.func,
    fetchEiinNumbers: PropTypes.func,
    fetchAllUsers: PropTypes.func,
    fetchNewPassword: PropTypes.func,
    fetchUser: PropTypes.func,
    history: PropTypes.any,
    inProgress: PropTypes.bool.isRequired,
    password: PropTypes.string,
    resetForm: PropTypes.func,
    setPassword: PropTypes.func,
    saveUser: PropTypes.func,
    userDetails: PropTypes.object,
  };

  static defaultProps = { inProgress: false };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  componentDidMount = () => {
    const {
      fetchRoles,
      fetchAllUsers,
      fetchNewPassword,
      fetchEiinNumbers,
    } = this.props;
    fetchAllUsers();
    fetchRoles();
    fetchEiinNumbers();
    fetchNewPassword();
  };

  onEditClick = async id => {
    //load user by id from the server
    await this.props.fetchUser(id);
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: true,
    }));
  };

  onDisableClick = async id => {
    const url = `/api/admin/user/disable/${id}`;
    if (this.isPropmpted('Are you sure to remove this user?')) {
      try {
        const res = await API.put(url);
        toastSuccess(res);
        this.props.history.push('/manage-user');
      } catch (error) {
        console.log('Error ', error);

        toastError(JSON.stringify(error.response.data));
      }
    } else {
      return;
    }
  };

  onUserDetailsSubmit = values => {
    const roles = values.get('roles');
    const eiin = values.get('eiinNumber');
    const newRole = roles.map(role => ({
      id: role.get('value'),
      name: role.get('label'),
    }));
    const newEiin = eiin.get('value');
    const data = {
      ...values.toJS(),
      roles: newRole.toJS(),
      eiinNumber: newEiin,
    };
    this.props.saveUser(data);
    //this.setState({ modal: this.props.inProgress && false });
  };

  onCreateClick = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
    }));
  };

  onModeratorOption = async (id, type = '') => {
    if (type === ActionType.remove) {
      if (
        !this.isPropmpted(
          'The teacher will not be able to moderate question. Are you sure?'
        )
      ) {
        return;
      } else {
        try {
          const res = await API.post(
            `/api/admin/moderator/${ActionType.remove}/${id}`
          );
          toastSuccess(res);
          this.props.history.push('/manage-user');
        } catch (error) {
          console.log('error', error);
          toastError(error.response.data);
        }
      }
    } else {
      if (
        !this.isPropmpted(
          'The teacher will be able to moderate question. Are you sure?'
        )
      ) {
        return;
      } else {
        try {
          const res = await API.post(
            `/api/admin/moderator/${ActionType.add}/${id}`
          );
          toastSuccess(res);
          this.props.history.push('/manage-user');
        } catch (error) {
          console.log('error', error);
          toastError(error.response.data);
        }
      }
    }
  };

  isPropmpted = msg => {
    if (window.confirm(msg)) {
      return true;
    } else {
      return false;
    }
  };

  generatePassword = () => {
    const { fetchNewPassword, setPassword, password } = this.props;
    fetchNewPassword();
    setPassword(password);
  };

  createDataForTable = users => {
    const columns = [
      {
        label: 'User Name',
        field: 'userName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Institute Name',
        field: 'instituteName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Roles',
        field: 'roles',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Allocation',
        field: 'allocation',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];

    const rows = users.map(user => ({
      userName: user.get('name'),
      email: user.get('email'),
      instituteName: user.get('instituteName'),

      roles: user
        .get('roles')
        .toJS()
        .join(', '),
      allocation:
        user.get('allocatedSubject') && user.get('allocatedSubject').size > 0
          ? user
              .get('allocatedSubject')
              .toJS()
              .join(', ')
          : 'N/A',
      status: user.get('enabled') ? 'Active' : 'Removed',
      action: user.get('enabled') ? (
        <span>
          <button
            className="btn btn-sm btn-outline-info"
            onClick={() => this.onEditClick(user.get('id'))}
          >
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>

          {user.get('roles').includes(Roles.MODERATOR) ? (
            <button
              className=" btn btn-sm btn-outline-danger"
              onClick={() =>
                this.onModeratorOption(user.get('id'), ActionType.remove)
              }
            >
              <i className="fa fa-trash" aria-hidden="true" />
              &nbsp;<span>Moderator</span>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() =>
                this.onModeratorOption(user.get('id'), ActionType.add)
              }
            >
              <i className="fa fa-plus" aria-hidden="true" /> &nbsp;
              <span>Moderator</span>
            </button>
          )}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => this.onDisableClick(user.get('id'))}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </span>
      ) : (
        'User is removed.'
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  prepareInitialValue = detail => {
    const eiin = detail.get('eiinNumber');
    const roles = detail.get('roles');
    if (eiin && roles) {
      const newRoles = roles.map(role => ({
        label: role.get('name'),
        value: role.get('id'),
      }));
      const eiinNumber = { label: eiin, value: eiin };
      const joinDate = moment(detail.get('joinDate')).format('YYYY-MM-DD');
      const birthDate = moment(detail.get('birthDate')).format('YYYY-MM-DD');

      return {
        ...detail.toJS(),
        joinDate,
        birthDate,
        roles: newRoles.toJS(),
        eiinNumber,
      };
    } else return {};
  };

  render() {
    const {
      allUsers,
      inProgress,
      allEiinNumbers,
      allRoles,

      userDetails,
    } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.onCreateClick}>
              Create User
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col text-center card">
            {this.props.inProgress ? (
              <Loader color="black" type="ThreeDots" width="200" height="400" />
            ) : (
              <MDBDataTable
                striped
                bordered
                data={this.createDataForTable(allUsers)}
              />
            )}
          </div>
        </div>
        <UserRegisterModal
          isOpen={this.state.modal}
          isUpdate={this.state.edit}
          inProgress={inProgress}
          toggle={this.onCreateClick}
          allRoles={allRoles}
          allEiinNumbers={allEiinNumbers}
          generatePassword={this.generatePassword}
          onUserDetailsSubmit={this.onUserDetailsSubmit}
          initialValues={
            this.state.edit ? this.prepareInitialValue(userDetails) : {}
          }
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allRoles: makeAllRoles(),
  allEiinNumbers: makeAllEiinNumbers(),
  allUsers: makeAllUsers(),
  inProgress: makeInProgress(),
  password: makeNewPassword(),
  userDetails: makeUserDetails(),
});

const mapDispatchToProps = dispatch => ({
  fetchRoles: () => dispatch(fetchAllRoles()),
  fetchEiinNumbers: () => dispatch(fetchEiinNumbers()),
  fetchNewPassword: () => dispatch(fetchNewPassword()),
  fetchAllUsers: () => dispatch(fetchUsers()),
  fetchUser: id => dispatch(fetchUser(id)),
  setPassword: pass => dispatch(change('userForm', 'password', pass)),
  resetForm: () => dispatch(reset('userForm')),
  saveUser: data => dispatch(saveUser(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UserInfo);
