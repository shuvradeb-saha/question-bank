import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';

import { UserRegisterModal } from 'components/Modals';

class UserInfo extends Component {
  static propTypes = {
    resetForm: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  onUserDetailsSubmit = values => {
    console.log('submitted ', values.toJS());
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

    console.log('Edit called', this.state.edit);

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
          onUserDetailsSubmit={this.onUserDetailsSubmit}
          initialValues={this.state.edit ? initalValues : {}}
        />
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('userForm')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UserInfo);
