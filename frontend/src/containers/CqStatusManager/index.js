import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { QuestionStatusType } from '../McqStatusManager/StatusType';
import {
  makeUserId,
  makeAllChapters,
  makeAllClasses,
  makeAllSubjects,
} from 'state/login/selectors';
import { fetchAllCq } from 'state/question/action';
import { CqQuestionList } from 'components';
import {
  makePendingCqs,
  makeRejectedCqs,
  makeApprovedCqs,
} from 'state/question/selectors';

class CqStatusManagement extends Component {
  static propTypes = {
    allClass: PropTypes.any,
    allSubject: PropTypes.any,
    allChapter: PropTypes.any,
    type: PropTypes.string.isRequired,
    fetchPendingCq: PropTypes.func,
    fetchApprovedCq: PropTypes.func,
    fetchRejecteCq: PropTypes.func,
    teacherId: PropTypes.number,
    pendingCqs: PropTypes.object,
    approvedCqs: PropTypes.object,
    rejectedCqs: PropTypes.object,
  };

  componentDidMount() {
    const {
      teacherId,
      fetchApprovedCq,
      fetchPendingCq,
      fetchRejecteCq,
      type,
    } = this.props;
    if (type === QuestionStatusType.PENDING) fetchPendingCq(teacherId);
    if (type === QuestionStatusType.APPROVED) fetchApprovedCq(teacherId);
    if (type === QuestionStatusType.REJECTED) fetchRejecteCq(teacherId);
  }

  render() {
    const {
      type,
      pendingCqs,
      rejectedCqs,
      approvedCqs,
      allChapter,
      allClass,
      allSubject,
    } = this.props;
    const cqs =
      type === QuestionStatusType.PENDING
        ? pendingCqs
        : type === QuestionStatusType.APPROVED
        ? approvedCqs
        : rejectedCqs;

    return (
      <div>
        <CqQuestionList
          allChapter={allChapter}
          allClass={allClass}
          allSubject={allSubject}
          status={type}
          allCqs={cqs}
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
  pendingCqs: makePendingCqs(),
  rejectedCqs: makeRejectedCqs(),
  approvedCqs: makeApprovedCqs(),
});

const mapDispatchToProps = dispatch => ({
  fetchPendingCq: teacherId =>
    dispatch(fetchAllCq(QuestionStatusType.PENDING, teacherId)),
  fetchApprovedCq: teacherId =>
    dispatch(fetchAllCq(QuestionStatusType.APPROVED, teacherId)),
  fetchRejecteCq: teacherId =>
    dispatch(fetchAllCq(QuestionStatusType.REJECTED, teacherId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CqStatusManagement);
