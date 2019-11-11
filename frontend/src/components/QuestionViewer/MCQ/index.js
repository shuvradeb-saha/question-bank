import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { McqType } from 'containers/CreateQuestion/Question';

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

class MCQ extends Component {
  static propTypes = {
    mcq: PropTypes.object.isRequired,
  };

  render() {
    const { mcq } = this.props;

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
  }
}

export default MCQ;
