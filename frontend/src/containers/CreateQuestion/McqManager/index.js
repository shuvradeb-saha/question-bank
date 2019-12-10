import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import PropTypes from 'prop-types';

import {
  makeAllClasses,
  makeAllSubjects,
  makeUserId,
  makeAllChapters,
} from 'state/login/selectors';
import { saveQuestion } from 'state/question/action';
import { QuestionType } from 'containers/CreateQuestion/Question';
import { McqForm } from 'components/QuestionForm';
import { reset } from 'redux-form';

const mcqFormSelector = formValueSelector('mcqForm');

class McqManager extends Component {
  static propTypes = {
    mcqType: PropTypes.string.isRequired,
    classes: PropTypes.object,
    chapters: PropTypes.object,
    resetForm: PropTypes.func,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
    selectedSubject: PropTypes.object,
    saveMcq: PropTypes.func,
    teacherId: PropTypes.number.isRequired,
  };

  onMcqSubmit = values => {
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
        mcqType: this.props.mcqType,
      };
      this.props.saveMcq(questionData, QuestionType.MCQ);
      this.props.history.push('/question/create');
      //this.props.resetForm();
    } else {
      return;
    }
  };

  render() {
    const {
      classes,
      subjects,
      selectedClass,
      mcqType,
      selectedSubject,
      chapters,
    } = this.props;

    return (
      <div>
        <McqForm
          mcqType={mcqType}
          subjects={subjects}
          classes={classes}
          chapters={chapters}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          onSubmit={this.onMcqSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedClass: state => mcqFormSelector(state, 'class'),
  selectedSubject: state => mcqFormSelector(state, 'subjectId'),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
  chapters: makeAllChapters(),
  teacherId: makeUserId(),
});

const mapDispatchToProps = dispatch => ({
  saveMcq: (question, type) => dispatch(saveQuestion(question, type)),
  resetForm: () => dispatch(reset('mcqForm')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(McqManager);
