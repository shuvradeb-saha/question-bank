import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { fetchMcqForModeration } from 'state/question/action';
import {
  makeInProgress,
  makeErrorCode,
  makeMcqForModerator,
  makeSimilarMcqs,
} from 'state/question/selectors';
import API from 'utils/api';
import { AccessDenied, NotFound, MCQ } from 'components';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { McqType } from 'containers/CreateQuestion/Question';
import { splitStringForContent } from 'utils/utils';
import { toastSuccess } from 'components/Toaster';

class ModerateMcqViewer extends Component {
  static propTypes = {
    match: PropTypes.any,
    fetchMcqForModeration: PropTypes.func,
    mcq: PropTypes.object,
    similarMcqs: PropTypes.any,
    inProgress: PropTypes.bool,
    errorCode: PropTypes.any,
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchMcqForModeration(id);
  }

  onApproveClick = async id => {
    if (
      window.confirm(
        'Question will be added to the approved question database. Are you sure?'
      )
    ) {
      const uri = `/api/moderator/question/MCQ/${id}/${QuestionStatusType.APPROVED}`;
      const response = await API.put(uri);
      toastSuccess(response);
      this.props.history.push('/moderate/mcq/approved');
    } else {
      return;
    }
  };

  onRejectClick = async id => {
    if (
      window.confirm(
        'Question will be added to the rejected question database. Are you sure?'
      )
    ) {
      const uri = `/api/moderator/question/MCQ/${id}/${QuestionStatusType.REJECTED}`;
      const response = await API.put(uri);
      toastSuccess(response);
      this.props.history.push('/moderate/mcq/rejected');
    } else {
      return;
    }
  };

  render() {
    const { mcq, errorCode, similarMcqs, inProgress } = this.props;
    const id = parseInt(this.props.match.params.id, 10);
    const status = mcq.get('status');

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
          <span>
            <div className="row ">
              <div className="col">
                <div>
                  <MCQ mcq={mcq} />
                </div>
                {status === QuestionStatusType.PENDING && (
                  <div className="row">
                    <div className="col-8">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => this.onApproveClick(id)}
                      >
                        <i className="fa fa-check" aria-hidden="true"></i>
                        &nbsp;&nbsp; Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => this.onRejectClick(id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        &nbsp;&nbsp;Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {status === QuestionStatusType.PENDING && (
                <div className="col-4">
                  <div className=" row bg-dark text-light p-2 rounded">
                    <strong>Similar Questions</strong>
                  </div>
                  {similarMcqs.map(mcq => {
                    const mcqType = mcq.get('mcqType');
                    let contentToShow = '';
                    if (mcqType === McqType.GENERAL) {
                      const mainStr = mcq.get('questionBody');
                      contentToShow = mainStr && splitStringForContent(mainStr);
                    } else if (mcqType === McqType.POLYNOMIAL) {
                      const mainStr = mcq.get('questionStatement');
                      contentToShow = mainStr && splitStringForContent(mainStr);
                    } else {
                      const mainStr = mcq.get('stem');
                      contentToShow = mainStr && splitStringForContent(mainStr);
                    }

                    return (
                      <div key={mcq.get('id')} className="row  p-2 ">
                        <Link
                          to={`/mcq/${mcq.get('id')}`}
                          style={{ color: 'blue' }}
                        >
                          {contentToShow}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </span>
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
  mcq: makeMcqForModerator(),
  similarMcqs: makeSimilarMcqs(),
  inProgress: makeInProgress(),
  errorCode: makeErrorCode(),
});

const mapDispatchToProps = dispatch => ({
  fetchMcqForModeration: id => dispatch(fetchMcqForModeration(id)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ModerateMcqViewer);
