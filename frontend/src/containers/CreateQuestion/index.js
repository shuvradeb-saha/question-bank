import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { getClassNameBySubjectId, getNameById } from 'utils/utils';

import {
  makeallAocatedSubjects,
  makeUserId,
  makeAllSubjects,
  makeAllClasses,
} from 'state/login/selectors';
import { fetchAllocatedSubject } from 'state/login/action';
class CreateQuestion extends Component {
  static propTypes = {
    allocatedSubjects: PropTypes.object,
    teacherId: PropTypes.number,
    fetchAllocatedSubject: PropTypes.func,
    allSubjects: PropTypes.object,
    allClass: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchAllocatedSubject(this.props.teacherId);
  }

  render() {
    const { allocatedSubjects, allClass, allSubjects } = this.props;

    const hasSubject = allocatedSubjects && allocatedSubjects.size > 0;
    if (hasSubject)
      allocatedSubjects.map(subId =>
        console.log(
          'sub',
          getClassNameBySubjectId(subId, allClass, allSubjects),
          getNameById(subId, allSubjects)
        )
      );
    return !hasSubject ? (
      <div className="alert alert-danger">
        <h3>
          <b>
            <i className="fa fa-frown-o" aria-hidden="true"></i>
            {'   '}Sorry!!
          </b>{' '}
          No subject has been allocated to you.
        </h3>
      </div>
    ) : (
      <div className="container">
        <div className="text-white bg-dark p-3 mb-2">
          <span>Allocated Subjects</span>
          {allocatedSubjects.map(subId => (
            <div className="m-2" key={subId}>
              <span>{`${getNameById(subId, allSubjects)} -> `}</span>
              <span>
                {getClassNameBySubjectId(subId, allClass, allSubjects)}
              </span>
            </div>
          ))}
        </div>
        <div className="card text-white">
          <div className="card-header bg-dark">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <span style={{ marginLeft: 5 }}>
              MCQ (Multiple Choice Question/বহুনির্বাচনী প্রশ্ন)
            </span>
          </div>
          <div className="card-body">
            <div className="list-group">
              <ul>
                <li className="list-group-item list-group-item-action list-group-item-secondary">
                  <span style={{ marginRight: 10 }}>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  </span>
                  <Link to="/question/mcq/general" className="text-dark">
                    General MCQ (সাধারণ বহুনির্বাচনী প্রশ্ন)
                  </Link>
                </li>
                <br />
                <li className="list-group-item list-group-item-action list-group-item-secondary">
                  <span style={{ marginRight: 10 }}>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  </span>
                  <Link to="/question/mcq/polynomial" className="text-dark">
                    Polynomial MCQ (বহুপদীসমাপ্তিসূচক বহুনির্বাচনী প্রশ্ন)
                  </Link>
                </li>
                <br />
                <li className="list-group-item list-group-item-action list-group-item-secondary">
                  <span style={{ marginRight: 10 }}>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  </span>
                  <Link to="/question/mcq/stem" className="text-dark">
                    Stem Based MCQ (উদ্দীপকভিত্তিক বহুনির্বাচনী প্রশ্ন)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div className="card text-white">
          <div className="card-header bg-dark">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <span style={{ marginLeft: 5 }}>
              CQ (Creative Question/সৃজনশীল প্রশ্ন)
            </span>
          </div>
          <div className="card-body">
            <ul>
              <li className="list-group-item list-group-item-action list-group-item-secondary">
                <span style={{ marginRight: 10 }}>
                  <i className="fa fa-check-square" aria-hidden="true"></i>
                </span>
                <Link to="/question/cq" className="text-dark">
                  Create CQ Question
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allocatedSubjects: makeallAocatedSubjects(),
  teacherId: makeUserId(),
  allSubjects: makeAllSubjects(),
  allClass: makeAllClasses(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllocatedSubject: id => dispatch(fetchAllocatedSubject(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateQuestion);
