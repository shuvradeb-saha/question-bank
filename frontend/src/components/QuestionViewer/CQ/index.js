import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class CqViewer extends Component {
  static propTypes = {
    cq: PropTypes.any,
  };

  render() {
    const { cq } = this.props;

    return (
      <div className="container clearfix border rounded p-3">
        <div className="row p-3">
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
        </div>
        <hr />
        <div className="row p-3">
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
