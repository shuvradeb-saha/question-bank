import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateQuestion extends Component {
  render() {
    const isSubjectEmpty = false;
    return isSubjectEmpty ? (
      <div className="alert alert-danger">
        <p>
          <h3>
            <b>
              <i className="fa fa-frown-o" aria-hidden="true"></i>
              {'   '}দুঃখিত!!
            </b>{' '}
            আপনাকে কোন বিষয় প্রদান করা হয়নি। এই মুহুর্তে আপনি কোন প্রশ্ন তৈরী
            করতে পারছেন না। বিষয় নির্ধারনের জন্য আপনার প্রতিষ্ঠান প্রধানের সাথে
            যোগাযোগ করুন।
          </h3>
        </p>
      </div>
    ) : (
      <div className="container">
        <div className="card text-white">
          <div className="card-header" style={{ backgroundColor: '#3b808b' }}>
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
                  <Link to="/general-mcq" className="text-dark">
                    General MCQ (সাধারণ বহুনির্বাচনী প্রশ্ন)
                  </Link>
                </li>
                <br />
                <li className="list-group-item list-group-item-action list-group-item-secondary">
                  <span style={{ marginRight: 10 }}>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  </span>
                  <Link to="/polynomial-mcq" className="text-dark">
                    Polynomial MCQ (বহুপদীসমাপ্তিসূচক বহুনির্বাচনী প্রশ্ন)
                  </Link>
                </li>
                <br />
                <li className="list-group-item list-group-item-action list-group-item-secondary">
                  <span style={{ marginRight: 10 }}>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  </span>
                  <Link to="/stem-mcq" className="text-dark">
                    Stem Based MCQ (উদ্দীপকভিত্তিক বহুনির্বাচনী প্রশ্ন)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div className="card text-white">
          <div className="card-header" style={{ backgroundColor: '#3b808b' }}>
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
                <Link to="/cq" className="text-dark">
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

export default CreateQuestion;
