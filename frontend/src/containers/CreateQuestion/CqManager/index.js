import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { CqForm } from 'components/QuestionForm';

import {
  makeAllClasses,
  makeAllSubjects,
  makeUserId,
  makeAllChapters,
} from 'state/login/selectors';
import API from 'utils/api';
import { toastSuccess, toastError } from 'components/Toaster';

const cqFormSelector = formValueSelector('cqForm');

class CqManager extends Component {
  static propTypes = {
    classes: PropTypes.object,
    chapters: PropTypes.object,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
    selectedSubject: PropTypes.object,
    saveMcq: PropTypes.func,
    teacherId: PropTypes.number.isRequired,
  };

  onCQSubmit = async values => {
    if (
      window.confirm(
        'Make sure you enter correct information. Question cannot be edited after submit. Are you sure to submit?'
      )
    ) {
      const data = values.toJS();
      const questionData = {
        ...data,
        createdBy: this.props.teacherId,
        subjectId: data.subjectId.value,
        chapterId: data.chapterId.value,
      };
      try {
        const uri = `/api/teacher/question/cq`;
        await API.post(uri, questionData);
        toastSuccess('Question has successfully submitted for approval.');
        this.props.history.push('/question/create');
      } catch (error) {
        toastError(`Unable to save. ${error.response.data.message}`);
        console.log('Error: ', error);
      }
    } else {
      return;
    }
  };

  render() {
    const {
      classes,
      subjects,
      selectedClass,
      selectedSubject,
      chapters,
    } = this.props;
    return (
      <div>
        <CqForm
          subjects={subjects}
          classes={classes}
          chapters={chapters}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          onSubmit={this.onCQSubmit}
        />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectedClass: state => cqFormSelector(state, 'class'),
  selectedSubject: state => cqFormSelector(state, 'subjectId'),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
  chapters: makeAllChapters(),
  teacherId: makeUserId(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CqManager);
