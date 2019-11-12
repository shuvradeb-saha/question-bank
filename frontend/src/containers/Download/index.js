import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form/immutable';

import { DownloadCriteria } from 'components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeAllClasses,
  makeAllSubjects,
  makeUserId,
} from 'state/login/selectors';

const downloadFormSelector = formValueSelector('downloadForm');
class Download extends Component {
  static propTypes = {
    userId: PropTypes.number,
    classes: PropTypes.object,
    chapters: PropTypes.object,
    selectedClass: PropTypes.object,
  };

  onSubmit = values => {
    const jsValue = values.toJS();

    const data = {
      teacherId: this.props.userId,
      ...jsValue,
      classId: jsValue.classId.value,
      subjectId: jsValue.subjectId.value,
      examType: jsValue.examType.value,
      questionType: jsValue.questionType.value,
    };

    console.log('data', data);
  };

  render() {
    const { classes, selectedClass, subjects } = this.props;
    return (
      <div>
        <DownloadCriteria
          classes={classes}
          subjects={subjects}
          selectedClass={selectedClass}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: makeUserId(),
  selectedClass: state => downloadFormSelector(state, 'class'),
  classes: makeAllClasses(),
  subjects: makeAllSubjects(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Download);
