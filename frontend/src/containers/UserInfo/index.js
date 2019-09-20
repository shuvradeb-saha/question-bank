/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';
import { change } from 'redux-form';
import moment from 'moment';
import { UserRegisterModal } from 'components/Modals';
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
  makeUserDetails,
} from 'state/admin/selectors';

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
    password: PropTypes.string,
    resetForm: PropTypes.func,
    setPassword: PropTypes.func,
    saveUser: PropTypes.func,
    userDetails: PropTypes.object,
  };

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
    console.log('data', data);

    // this.props.saveUser(data);
  };

  onCreateClick = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
    }));
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
        label: 'Institute Name',
        field: 'instituteName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'EIIN Number',
        field: 'eiinNumber',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Roles',
        field: 'roles',
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
      instituteName: user.get('instituteName'),
      eiinNumber: user.get('eiinNumber'),
      roles: user.get('roles'),
      action: (
        <button
          className="btn btn-sm btn-outline-info"
          onClick={() => this.onEditClick(user.get('id'))}
        >
          Edit
        </button>
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
    const { allUsers, allEiinNumbers, allRoles, userDetails } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.onCreateClick}>
              Create New User
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MDBDataTable
              striped
              bordered
              small
              data={this.createDataForTable(allUsers)}
            />
          </div>
        </div>
        <UserRegisterModal
          isOpen={this.state.modal}
          isUpdate={this.state.edit}
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
