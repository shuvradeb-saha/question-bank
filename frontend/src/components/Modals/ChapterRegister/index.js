import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm, FieldArray } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormInput, FormSelect } from 'components';

class ChapterRegister extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
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

  prepareSubjects = subjects =>
    subjects.map(subject => ({
      label: subject.get('name'),
      value: subject.get('id'),
    }));

  renderLearningOutcomes = ({ fields }) => (
    <div>
      {fields.map((learningOutcome, index) => (
        <div key={index}>
          <FormInput
            name={`${learningOutcome}.learningOutcome`}
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
                options={this.prepareSubjects(this.props.subjects)}
              />
              <FormInput name="name" label="Chapter Name" />
              <FieldArray
                name="learningOutcomes"
                component={this.renderLearningOutcomes}
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
    form: 'chapterForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
  })
)(ChapterRegister);
