import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  getClassNameBySubjectId,
  getNameById,
  getChpNameById,
} from 'utils/utils';
import {
  makeAllClasses,
  makeAllSubjects,
  makeAllChapters,
} from 'state/login/selectors';

class CqViewer extends Component {
  static propTypes = {
    cq: PropTypes.any,
    allClass: PropTypes.any,
    allChapters: PropTypes.any,
    allSubjects: PropTypes.any,
  };

  render() {
    const { cq, allClass, allChapters, allSubjects } = this.props;

    return (
      <div className="container clearfix border rounded p-3">
        <div className="row mt-2">
          <div className="col">
            <label htmlFor="createdAt">
              Created at: &nbsp;
              <span id="createdAt">
                {moment(cq.get('createdAt')).format('YYYY-MM-DD')}
              </span>
            </label>
          </div>
          <div className="col">
            <label htmlFor="difficulty">
              Difficulty: &nbsp;
              <span id="difficulty">{cq.get('difficulty')}</span>
            </label>
          </div>
          <div className="col">
            <label htmlFor="clasz">
              Class:&nbsp;
              <span id="clasz">
                {getClassNameBySubjectId(
                  cq.get('subjectId'),
                  allClass,
                  allSubjects
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="row ">
          <div className="col-4">
            <label htmlFor="subject">
              Subject : &nbsp;
              <span id="subject">
                {getNameById(cq.get('subjectId'), allSubjects)}
              </span>
            </label>
          </div>
          <div className="col-4">
            <label htmlFor="chapter">
              Chapter: &nbsp;
              <span id="chapter">
                {getChpNameById(cq.get('chapterId'), allChapters)}
              </span>
            </label>
          </div>
        </div>
        <hr />
        <div className="row p-3 text-justify">
          <label htmlFor="stem">উদ্দীপকঃ</label>&nbsp;
          <span>{cq.get('stem')}</span>
        </div>
        <div className="row pl-3 pb-1">
          <span>(ক)</span>&nbsp;
          <span>{cq.get('knowledgeBased')}</span>
        </div>
        <div className="row pl-3 pb-1">
          <span>(খ)</span>&nbsp;
          <span>{cq.get('understandingBased')}</span>
        </div>
        <div className="row pl-3 pb-1">
          <span>(গ)</span>&nbsp;
          <span>{cq.get('applicationBased')}</span>
        </div>
        <div className="row pl-3 pb-1">
          <span>(ঘ)</span>&nbsp;
          <span>{cq.get('higherAbility')}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allClass: makeAllClasses(),
  allSubjects: makeAllSubjects(),
  allChapters: makeAllChapters(),
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(CqViewer);
