/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';
import { change } from 'redux-form';

import { UserRegisterModal } from 'components/Modals';
import {
  fetchAllRoles,
  fetchEiinNumbers,
  fetchNewPassword,
  saveUser,
} from 'state/admin/action';
import { createStructuredSelector } from 'reselect';
import {
  makeAllRoles,
  makeAllEiinNumbers,
  makeNewPassword,
} from 'state/admin/selectors';

class UserInfo extends Component {
  static propTypes = {
    allRoles: PropTypes.object,
    allEiinNumbers: PropTypes.object,
    fetchRoles: PropTypes.func,
    fetchEiinNumbers: PropTypes.func,
    password: PropTypes.string,
    resetForm: PropTypes.func,
    setPassword: PropTypes.func,
    saveUser: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  componentDidMount() {
    const { fetchRoles, fetchNewPassword, fetchEiinNumbers } = this.props;
    fetchRoles();
    fetchEiinNumbers();
    fetchNewPassword();
  }

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
    console.log('Data = ', data);

    this.props.saveUser(data);
  };

  generatePassword = () => {
    const { fetchNewPassword, setPassword, password } = this.props;
    fetchNewPassword();
    setPassword(password);
  };

  onCreateClick = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
    }));
  };

  onEditClick = id => {
    //load user by id from the server
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: true,
    }));
  };

  render() {
    let initalValues = { firstName: 'Shuvra', birthDate: '1997-01-10' };
    const { allEiinNumbers, allRoles } = this.props;

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
            <MDBDataTable striped bordered small />
          </div>
        </div>
        <UserRegisterModal
          isOpen={this.state.modal}
          isUpdate={false}
          toggle={this.onCreateClick}
          allRoles={allRoles}
          allEiinNumbers={allEiinNumbers}
          generatePassword={this.generatePassword}
          onUserDetailsSubmit={this.onUserDetailsSubmit}
          initialValues={this.state.edit ? initalValues : {}}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allRoles: makeAllRoles(),
  allEiinNumbers: makeAllEiinNumbers(),
  password: makeNewPassword(),
});

const mapDispatchToProps = dispatch => ({
  fetchRoles: () => dispatch(fetchAllRoles()),
  fetchEiinNumbers: () => dispatch(fetchEiinNumbers()),
  fetchNewPassword: () => dispatch(fetchNewPassword()),
  setPassword: pass => dispatch(change('userForm', 'password', pass)),
  resetForm: () => dispatch(reset('userForm')),
  saveUser: data => dispatch(saveUser(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UserInfo);
