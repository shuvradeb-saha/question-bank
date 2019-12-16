import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { QuestionStatusType } from './StatusType';
import {
  makeUserId,
  makeAllChapters,
  makeAllClasses,
  makeAllSubjects,
} from 'state/login/selectors';
import { fetchAllMcq } from 'state/question/action';
import { QuestionList } from 'components';
import {
  makePendingMcqs,
  makeRejectedMcqs,
  makeApprovedMcqs,
} from 'state/question/selectors';

class McqStatusManagement extends Component {
  static propTypes = {
    allClass: PropTypes.any,
    allSubject: PropTypes.any,
    allChapter: PropTypes.any,
    type: PropTypes.string.isRequired,
    fetchPendingMcq: PropTypes.func,
    fetchApprovedMcq: PropTypes.func,
    fetchRejectedMcq: PropTypes.func,
    teacherId: PropTypes.number,
    pendingMcqs: PropTypes.object,
    approvedMcqs: PropTypes.object,
    rejectedMcqs: PropTypes.object,
  };

  componentDidMount() {
    const {
      teacherId,
      fetchApprovedMcq,
      fetchPendingMcq,
      fetchRejectedMcq,
      type,
    } = this.props;
    if (type === QuestionStatusType.PENDING) fetchPendingMcq(teacherId);
    if (type === QuestionStatusType.APPROVED) fetchApprovedMcq(teacherId);
    if (type === QuestionStatusType.REJECTED) fetchRejectedMcq(teacherId);
  }

  render() {
    const {
      type,
      pendingMcqs,
      rejectedMcqs,
      approvedMcqs,
      allChapter,
      allClass,
      allSubject,
    } = this.props;
    const mcqs =
      type === QuestionStatusType.PENDING
        ? pendingMcqs
        : type === QuestionStatusType.APPROVED
        ? approvedMcqs
        : rejectedMcqs;

    return (
      <div>
        <QuestionList
          allChapter={allChapter}
          allClass={allClass}
          allSubject={allSubject}
          status={type}
          allMcqs={mcqs}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allClass: makeAllClasses(),
  allChapter: makeAllChapters(),
  allSubject: makeAllSubjects(),
  teacherId: makeUserId(),
  pendingMcqs: makePendingMcqs(),
  rejectedMcqs: makeRejectedMcqs(),
  approvedMcqs: makeApprovedMcqs(),
});

const mapDispatchToProps = dispatch => ({
  fetchPendingMcq: teacherId =>
    dispatch(fetchAllMcq(QuestionStatusType.PENDING, teacherId)),
  fetchApprovedMcq: teacherId =>
    dispatch(fetchAllMcq(QuestionStatusType.APPROVED, teacherId)),
  fetchRejectedMcq: teacherId =>
    dispatch(fetchAllMcq(QuestionStatusType.REJECTED, teacherId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(McqStatusManagement);
