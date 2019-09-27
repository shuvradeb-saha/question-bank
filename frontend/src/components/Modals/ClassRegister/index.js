import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormInput } from 'components';

class ClassRegister extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onClassSubmit: PropTypes.func.isRequired,
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
      onClassSubmit,
      pristine,
      valid,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <div className="container-fluid">
        <Modal centered isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {isUpdate ? 'Update ' : 'Create '}Class
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onClassSubmit)}>
              <FormInput name="name" label="Class Name" />
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
    form: 'classForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(ClassRegister);
