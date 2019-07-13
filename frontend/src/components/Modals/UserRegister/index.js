import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';

import { FormInput, FormSelect } from 'components';
import { getRoleObject } from './Roles';

class UserRegister extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
    onUserDetailsSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    valid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    isUpdate: false,
  };

  render() {
    const {
      isOpen,
      isUpdate,
      toggle,
      onUserDetailsSubmit,
      pristine,
      valid,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <div className="container-fluid">
        <Modal size="lg" isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {isUpdate ? 'Update ' : 'Create '}User
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onUserDetailsSubmit)}>
              <div className="row">
                <div className="col-6">
                  <FormInput name="email" label="Email" />
                </div>
                <div className="col-6">
                  <FormInput name="password" label="Password" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <FormInput name="firstName" label="First Name" />
                </div>
                <div className="col-6">
                  <FormInput name="lastName" label="Last Name" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <FormInput name="birthDate" label="Birth Date" type="date" />
                </div>
                <div className="col-6">
                  <FormInput name="joinDate" label="Join Date" type="date" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <FormInput
                    name="eiinNumber"
                    label="EIIN Number"
                    type="number"
                  />
                </div>
                <div className="col-6">
                  <FormSelect
                    name="roles"
                    label="Select Role"
                    options={getRoleObject()}
                    multi
                  />
                </div>
              </div>

              <FormInput name="permanentAddress" label="Parmanent Address" />
              <FormInput name="tempAddress" label="Present Address" />
              <Button disabled={!valid || pristine || submitting} type="submit">
                Save
              </Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default compose(
  reduxForm({
    form: 'userForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(UserRegister);
