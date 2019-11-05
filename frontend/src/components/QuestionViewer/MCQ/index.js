import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader-spinner';
import { fetchMcq } from 'state/question/action';
import {
  makeMcq,
  makeInProgress,
  makeErrorCode,
} from 'state/question/selectors';
import { McqType } from 'containers/CreateQuestion/Question';
import { AccessDenied, NotFound } from 'components';

export const getAnsStrFromNum = n => {
  switch (n) {
    case 1:
      return 'ক';
    case 2:
      return 'খ';
    case 3:
      return 'গ';
    default:
      return 'ঘ';
  }
};

export const renderGeneralViewer = mcq => (
  <div className="row p-2">
    <div className="col">
      <div className="row p-2">{mcq.get('questionBody')}</div>

      <div className="row">
        <div className="col-4">
          <label htmlFor="op1">(ক)&nbsp;{mcq.get('option1')}</label>
        </div>
        <div className="col-4">
          <label htmlFor="op2">(খ)&nbsp;{mcq.get('option2')}</label>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <label htmlFor="op3">(গ)&nbsp;{mcq.get('option3')}</label>
        </div>
        <div className="col-4">
          <label htmlFor="op4">(ঘ)&nbsp;{mcq.get('option4')}</label>
        </div>
      </div>
      <div className="row p-2">
        <label htmlFor="op4">
          <b>সঠিক উত্তর:</b>&nbsp;{getAnsStrFromNum(mcq.get('answer'))}
        </label>
      </div>
    </div>
  </div>
);

export const renderPolynomialViewer = mcq => (
  <div className="p-2">
    <div className="mb-1">{mcq.get('questionStatement')}</div>
    <div>
      <label htmlFor="st1">(i)&nbsp;{mcq.get('statement1')}</label>
    </div>
    <div>
      <label htmlFor="st1">(ii)&nbsp;{mcq.get('statement2')}</label>
    </div>
    <div>
      <label htmlFor="st1">(iii)&nbsp;{mcq.get('statement3')}</label>
    </div>
    {renderGeneralViewer(mcq)}
  </div>
);

export const renderStemViewer = mcq => {
  const generalMcqs = mcq.get('generalMcqs');
  const polynomialMcqs = mcq.get('polynomialMcqs');
  return (
    <div>
      <div>
        <label htmlFor="stem">উদ্দীপকঃ</label>&nbsp;
        <span>{mcq.get('stem')}</span>
      </div>
      {generalMcqs &&
        generalMcqs.map((gmcq, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <label htmlFor="stem">প্রশ্নঃ</label>
            {renderGeneralViewer(gmcq)}
          </div>
        ))}
      {polynomialMcqs &&
        polynomialMcqs.map((pmcq, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <label htmlFor="stem">প্রশ্নঃ</label>
            {renderPolynomialViewer(pmcq)}
          </div>
        ))}
    </div>
  );
};

class McqViewer extends Component {
  static propTypes = {
    match: PropTypes.any,
    fetchMcq: PropTypes.func,
    mcq: PropTypes.object,
    inProgress: PropTypes.bool,
    errorCode: PropTypes.any,
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchMcq(id);
  }

  render() {
    const { mcq, errorCode, inProgress } = this.props;
    if (inProgress) {
      return (
        <div className="container-fluid h-100 mt-5">
          <div className="row align-items-center h-100">
            <div className="col mx-auto">
              <div className="jumbotron">
                <div className=" d-flex align-items-center flex-column justify-content-center h-100 text-white">
                  <Loader
                    type="Bars"
                    color="#00BFFF"
                    height="200"
                    width="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      if (errorCode === 403) {
        return <AccessDenied />;
      } else if (errorCode === 404) {
        return <NotFound />;
      } else if (errorCode === '') {
        return (
          <div className="container clearfix border rounded">
            <div className="row p-3">
              <div className="col">
                <label htmlFor="type">
                  Mcq type:&nbsp;
                  <span id="type">{mcq.get('mcqType')}</span>
                </label>
              </div>
              <div className="col">
                <label htmlFor="createdAt">
                  Created at: &nbsp;
                  <span id="createdAt">
                    {moment(mcq.get('createdAt')).format('YYYY-MM-DD')}
                  </span>
                </label>
              </div>
              <div className="col">
                <label htmlFor="difficulty">
                  Difficulty: &nbsp;
                  <span id="difficulty">{mcq.get('difficulty')}</span>
                </label>
              </div>
            </div>
            <hr />
            {mcq.get('mcqType') === McqType.GENERAL && renderGeneralViewer(mcq)}
            {mcq.get('mcqType') === McqType.POLYNOMIAL &&
              renderPolynomialViewer(mcq)}
            {mcq.get('mcqType') === McqType.STEM && renderStemViewer(mcq)}
          </div>
        );
      } else {
        return (
          <div className="alert-warn">
            Server fault. Please reload your page.
          </div>
        );
      }
    }
  }
}

const mapStateToProps = createStructuredSelector({
  mcq: makeMcq(),
  inProgress: makeInProgress(),
  errorCode: makeErrorCode(),
});

const mapDispatchToProps = dispatch => ({
  fetchMcq: id => dispatch(fetchMcq(id)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(McqViewer);
