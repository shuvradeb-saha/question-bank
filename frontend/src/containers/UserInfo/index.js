/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';

import { UserRegisterModal } from 'components/Modals';
import { fetchAllRoles, saveUser } from 'state/admin/action';
import { createStructuredSelector } from 'reselect';
import { makeAllRoles } from 'state/admin/selectors';

class UserInfo extends Component {
  static propTypes = {
    resetForm: PropTypes.func,
    fetchRoles: PropTypes.func,
    allRoles: PropTypes.object,
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
    this.props.fetchRoles();
  }

  onUserDetailsSubmit = values => {
    const roles = values.get('roles');
    const newRole = roles.map(role => ({
      id: role.get('value'),
      name: role.get('label'),
    }));
    const data = { ...values.toJS(), roles: newRole.toJS() };
    console.log('data = ', data);
    this.props.saveUser(data);
  };

  handleClick = id => {
    console.log('clicked item', id);
  };

  openModalToCreateNewUser = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  editUserInfo = id => {
    //load user by id from the server
    this.props.resetForm();
    console.log('id');
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: !prevState.edit,
    }));
  };

  render() {
    let initalValues = { firstName: 'Shuvra', birthDate: '1997-01-10' };

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Institute',
          field: 'institute',
          sort: 'asc',
          width: 270,
        },
        {
          label: 'EIIN',
          field: 'eiin',
          sort: 'asc',
          width: 200,
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
          width: 200,
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 200,
        },
      ],
      rows: [
        {
          name: 'Shuvradeb Saha',
          institute: 'Zagla H. M. High School',
          eiin: '11378995',
          role: 'Headmaster, Teacher',
          Action: (
            <span>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={() => this.editUserInfo(5)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => this.handleClick(6)}
              >
                Make Moderator
              </button>
            </span>
          ),
        },
      ],
    };

    return (
      <div>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={this.openModalToCreateNewUser}
            >
              Create New User
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MDBDataTable striped bordered small data={data} />
          </div>
        </div>
        <UserRegisterModal
          isOpen={this.state.modal}
          isUpdate={false}
          toggle={this.openModalToCreateNewUser}
          allRoles={this.props.allRoles}
          onUserDetailsSubmit={this.onUserDetailsSubmit}
          initialValues={this.state.edit ? initalValues : {}}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allRoles: makeAllRoles(),
});

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('userForm')),
  fetchRoles: () => dispatch(fetchAllRoles()),
  saveUser: data => dispatch(saveUser(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UserInfo);
