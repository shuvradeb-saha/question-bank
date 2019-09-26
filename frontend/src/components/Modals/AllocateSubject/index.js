import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm, FieldArray } from 'redux-form/immutable';
import { compose } from 'redux';

import { FormInput, FormSelect } from 'components';

class AllocateSubject extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    subjects: PropTypes.object.isRequired,
    selectedClass: PropTypes.object,
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

  prepareSubjects = subjects => {
    const { selectedClass } = this.props;
    return subjects
      .filter(
        subject =>
          selectedClass && subject.get('classId') === selectedClass.get('value')
      )
      .map(subject => ({
        label: subject.get('name'),
        value: subject.get('id'),
      }));
  };

  renderLearningOutcomes = ({ fields }) => (
    <div>
      {fields.map((learningOutcome, index) => (
        <div key={index}>
          <FormInput
            name={learningOutcome}
            label={`Learning Outcome #${index + 1}`}
          />
          <button
            className="btn btn-danger btn-sm"
            type="button"
            onClick={() => fields.remove(index)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      ))}
      <button
        className="btn btn-success btn-sm"
        type="button"
        onClick={() => fields.push()}
      >
        Add Learning Outcome
      </button>
    </div>
  );

  render() {
    const {
      isOpen,
      isUpdate,
      toggle,
      pristine,
      valid,
      submitting,
      handleSubmit,
      selectedClass,
    } = this.props;

    return (
      <div className="container-fluid">
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {isUpdate ? 'Update ' : 'Create '}Chapter
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormSelect
                name="class"
                label="Select Class"
                options={this.prepareClasses(this.props.classes)}
              />
              <FormSelect
                name="subject"
                label="Select Subject"
                placeholder={
                  selectedClass ? 'Select Subject' : 'Please Select Class First'
                }
                disabled={selectedClass ? false : true}
                options={this.prepareSubjects(this.props.subjects)}
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
    form: 'allocateSubjectForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(AllocateSubject);
