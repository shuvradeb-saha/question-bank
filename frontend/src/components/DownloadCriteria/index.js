import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';

import { prepareClasses, prepareSubjects } from 'utils/utils';
import { FormSelect } from 'components';
import { fromJS } from 'immutable';

const examType = fromJS([
  { label: 'বার্ষিক পরীক্ষা', value: 'finalExam' },
  { label: 'অর্ধ-বার্ষিক পরীক্ষা', value: 'midExam' },
]);

const questionType = fromJS([
  { label: 'সৃজনশীল প্রশ্ন', value: 'CQ' },
  { label: 'বহুনির্বাচনী প্রশ্ন', value: 'MCQ' },
]);

class DownloadCriteria extends Component {
  static propTypes = {
    classes: PropTypes.object,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
    onSubmit: PropTypes.func,
    inProgress: PropTypes.bool,
    status: PropTypes.bool,
  };

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
      pristine,
      classes,
      subjects,
      selectedClass,
      inProgress,
      status,
    } = this.props;

    return (
      <span>
        <div className="jumbotron">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <FormSelect
                  name="classId"
                  label="শ্রেণী"
                  options={prepareClasses(classes)}
                />
              </div>
              <div className="col">
                <FormSelect
                  name="subjectId"
                  label="বিষয়"
                  placeholder={
                    selectedClass
                      ? 'Select subject'
                      : 'Please select class first'
                  }
                  disabled={selectedClass ? false : true}
                  options={prepareSubjects(selectedClass, subjects)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormSelect
                  name="examType"
                  label="পরীক্ষার ধরণ"
                  options={examType}
                />
              </div>
              <div className="col">
                <FormSelect
                  name="questionType"
                  label="প্রশ্নের ধরণ"
                  options={questionType}
                />
              </div>
            </div>

            <div className="row">
              <div className="col text-right">
                {inProgress ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Generating Paper...
                  </button>
                ) : (
                  <button
                    disabled={!valid || pristine || submitting || status}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Generate Paper
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </span>
    );
  }
}
export default reduxForm({
  form: 'downloadForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(DownloadCriteria);