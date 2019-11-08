import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import { makeallAocatedSubjects, makeUserId } from 'state/login/selectors';
import { fetchAllocatedSubject } from 'state/login/action';
class CreateQuestion extends Component {
  static propTypes = {
    allocatedSubjects: PropTypes.object,
    teacherId: PropTypes.number,
    fetchAllocatedSubject: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchAllocatedSubject(this.props.teacherId);
  }

  render() {
    const { allocatedSubjects } = this.props;

    const hasSubject = allocatedSubjects && allocatedSubjects.size > 0;
    console.log('has subject', hasSubject);

    return !hasSubject ? (
      <div className="alert alert-danger">
        <h3>
          <b>
            <i className="fa fa-frown-o" aria-hidden="true"></i>
            {'   '}দুঃখিত!!
          </b>{' '}
          আপনাকে কোন বিষয় প্রদান করা হয়নি। এই মুহুর্তে আপনি কোন প্রশ্ন তৈরী করতে
          পারছেন না। বিষয় নির্ধারনের জন্য আপনার প্রতিষ্ঠান প্রধানের সাথে যোগাযোগ
          করুন।
        </h3>
      </div>
    ) : (
      <div className="container">
        <div className="card text-white">
          <div className="card-header bg-dark">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <span style={{ marginLeft: 5 }}>
              MCQ (Multiple Choice Question/বহুনির্বাচনী প্রশ্ন)
            </span>
          </div>
          <div className="card-body" style={{ backgroundColor: '#e0e0e0' }}>
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
          <div className="card-body" style={{ backgroundColor: '#e0e0e0' }}>
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
});

const mapDispatchToProps = dispatch => ({
  fetchAllocatedSubject: id => dispatch(fetchAllocatedSubject(id)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(CreateQuestion);
