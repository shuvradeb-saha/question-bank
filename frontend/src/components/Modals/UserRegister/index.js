import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { FormInput, FormSelect } from 'components';

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
    allRoles: PropTypes.object,
  };

  static defaultProps = {
    isOpen: false,
    isUpdate: false,
  };

  prepareRoles = roles =>
    roles.map(role => ({
      label: role.get('name'),
      value: role.get('id'),
    }));

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
      allRoles,
    } = this.props;

    const roleOptions = this.prepareRoles(allRoles);

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
                  <div>
                    <FormInput name="password" label="Password" />
                  </div>
                  <div style={{ marginTop: '-10px' }}>
                    <Link to="/generate-password">Generate Password</Link>
                  </div>
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
                  <FormSelect
                    name="roles"
                    label="Select Role"
                    options={roleOptions}
                    multi
                  />
                </div>
                <div className="col-6">
                  <FormInput
                    name="eiinNumber"
                    label="EIIN Number"
                    type="number"
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
