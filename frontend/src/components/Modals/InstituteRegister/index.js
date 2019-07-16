import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormInput } from 'components';

class InstituteRegister extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onInstituteSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    toggle: PropTypes.func,
    valid: PropTypes.bool,
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
      onInstituteSubmit,
      pristine,
      valid,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <div className="container-fluid">
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {isUpdate ? 'Update ' : 'Create '}Institute
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onInstituteSubmit)}>
              <FormInput name="name" label="Institute Name" />
              <FormInput name="eiinNumber" label="EIIN Number" type="number" />

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
)(InstituteRegister);
