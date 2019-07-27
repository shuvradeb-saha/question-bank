import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormInput, FormSelect } from 'components';

class SubjectRegister extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onSubjectSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    toggle: PropTypes.func,
    valid: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    isUpdate: false,
  };

  prepareClasses = classes =>
    classes.map(cls => ({
      label: cls.get('name'),
      value: cls.get('id'),
    }));

  render() {
    const {
      isOpen,
      isUpdate,
      toggle,
      onSubjectSubmit,
      pristine,
      valid,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <div className="container-fluid">
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {isUpdate ? 'Update ' : 'Create '}Subject
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubjectSubmit)}>
              <FormInput name="name" label="Subject Name" />
              <FormInput
                name="subjectCode"
                label="Subject Code"
                type="number"
              />
              <FormSelect
                name="class"
                label="Select Class"
                options={this.prepareClasses(this.props.classes)}
              />

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
    form: 'subjectForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(SubjectRegister);
