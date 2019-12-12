import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';

import { FormInput, FormSelect } from 'components';
import { fromJS } from 'immutable';
import Loader from 'react-loader-spinner';

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
    isAdmin: PropTypes.bool,
    inProgress: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    isUpdate: false,
    isAdmin: true,
    inProgress: false,
    allRoles: fromJS({}),
    allEiinNumbers: fromJS({}),
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
      inProgress,
    } = this.props;

    const roleOptions = this.prepareRoles(allRoles);
    const eiinOptions = this.prepareEiinNumbers(allEiinNumbers);

    return (
      <div className="container-fluid">
        <Modal
          centered
          size="lg"
          isOpen={isOpen}
          backdrop={false}
          toggle={toggle}
        >
          <ModalHeader toggle={toggle}>
            {inProgress
              ? 'Saving user...'
              : isUpdate
              ? 'Update User'
              : 'Create User'}
          </ModalHeader>
          <ModalBody>
            {inProgress ? (
              <div className="text-center" style={{ height: '500px' }}>
                <Loader type="Oval" height="200" width="200" color="blue" />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onUserDetailsSubmit)}>
                <div className="row">
                  <div className="col">
                    <FormInput
                      name="email"
                      label="Email"
                      type="email"
                      disabled={isUpdate}
                    />
                  </div>
                  {!isUpdate && (
                    <div className="col-6">
                      <div>
                        <FormInput name="password" label="Password" />
                      </div>
                      <div style={{ marginTop: '-15px' }}>
                        <button
                          type="button"
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
                    <FormInput
                      name="firstName"
                      label="First Name"
                      disabled={isUpdate}
                    />
                  </div>
                  <div className="col-6">
                    <FormInput
                      name="lastName"
                      label="Last Name"
                      disabled={isUpdate}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <FormInput
                      name="birthDate"
                      label="Birth Date"
                      type="date"
                      disabled={isUpdate}
                    />
                  </div>
                  <div className="col-6">
                    <FormInput
                      name="joinDate"
                      label="Join Date"
                      type="date"
                      disabled={isUpdate}
                    />
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
                      disabled={isUpdate}
                    />
                  </div>
                  <div className="col-6">
                    <FormInput
                      name="tempAddress"
                      label="Present Address"
                      disabled={isUpdate}
                    />
                  </div>
                </div>

                <Button
                  disabled={!valid || pristine || submitting}
                  type="submit"
                >
                  Save
                </Button>
              </form>
            )}
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
