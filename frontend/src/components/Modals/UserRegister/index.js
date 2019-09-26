import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';

import { FormInput, FormSelect } from 'components';

class UserRegister extends Component {
  static propTypes = {
    allRoles: PropTypes.object,
    allEiinNumbers: PropTypes.object,
    generatePassword: PropTypes.func,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onUserDetailsSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    toggle: PropTypes.func,
    valid: PropTypes.bool,
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

  prepareEiinNumbers = eiinNumbers =>
    eiinNumbers.map(eiin => ({ label: eiin, value: eiin }));

  render() {
    const {
      isOpen,
      isUpdate,
      toggle,
      onUserDetailsSubmit,
      generatePassword,
      pristine,
      valid,
      submitting,
      handleSubmit,
      allRoles,
      allEiinNumbers,
    } = this.props;

    const roleOptions = this.prepareRoles(allRoles);
    const eiinOptions = this.prepareEiinNumbers(allEiinNumbers);

    return (
      <div className="container-fluid">
        <Modal size="lg" isOpen={isOpen} backdrop={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {isUpdate ? 'Update ' : 'Create '}User
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onUserDetailsSubmit)}>
              <div className="row">
                <div className="col">
                  <FormInput name="email" label="Email" />
                </div>
                {!isUpdate && (
                  <div className="col-6">
                    <div>
                      <FormInput name="password" label="Password" />
                    </div>
                    <div style={{ marginTop: '-15px' }}>
                      <button
                        onClick={generatePassword}
                        className="link-button"
                      >
                        Generate Password
                      </button>
                    </div>
                  </div>
                )}
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
                  <FormSelect
                    name="eiinNumber"
                    label="EIIN Number"
                    options={eiinOptions}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <FormInput
                    name="permanentAddress"
                    label="Parmanent Address"
                  />
                </div>
                <div className="col-6">
                  <FormInput name="tempAddress" label="Present Address" />
                </div>
              </div>

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
