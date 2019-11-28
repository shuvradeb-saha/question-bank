import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { fetchCQForModeration } from 'state/question/action';
import {
  makeInProgress,
  makeErrorCode,
  makeCqForModerator,
  makeSimilarCqs,
} from 'state/question/selectors';
import { makeUserId } from 'state/login/selectors';
import API from 'utils/api';
import { AccessDenied, NotFound, CQ } from 'components';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';

import { splitStringForContent } from 'utils/utils';
import { toastSuccess, toastError } from 'components/Toaster';

class ModeratorCqViewer extends Component {
  static propTypes = {
    userId: PropTypes.number,
    match: PropTypes.any,
    fetchCQForModeration: PropTypes.func,
    cq: PropTypes.object,
    similarCqs: PropTypes.any,
    inProgress: PropTypes.bool,
    errorCode: PropTypes.any,
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchCQForModeration(id);
  }

  onApproveClick = async id => {
    if (
      window.confirm(
        'Question will be added to the approved question database. Are you sure?'
      )
    ) {
      const uri = `/api/moderator/question/CQ/${id}/${QuestionStatusType.APPROVED}`;
      try {
        const response = await API.put(uri);
        toastSuccess(response);
      } catch (error) {
        toastError('Some error occured during approving question.');
      }
      this.props.history.push('/moderate/cq/approved');
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
      const uri = `/api/moderator/question/CQ/${id}/${QuestionStatusType.REJECTED}`;

      try {
        const response = await API.put(uri);
        toastSuccess(response);
      } catch (error) {
        toastError('Some error occured during rejecting question.');
      }
      this.props.history.push('/moderate/cq/rejected');
    } else {
      return;
    }
  };

  render() {
    const { cq, errorCode, similarCqs, inProgress, userId } = this.props;
    const id = parseInt(this.props.match.params.id, 10);

    const status = cq.get('status');

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
                  <CQ cq={cq} />
                </div>
                {status === QuestionStatusType.PENDING &&
                  cq.get('moderatedBy') === userId && (
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

              {status === QuestionStatusType.PENDING &&
                cq.get('moderatedBy') === userId && (
                  <div className="col-4">
                    <div className=" row bg-dark text-light p-2 rounded">
                      <strong>Similar Questions</strong>
                    </div>
                    {similarCqs.map(cq => {
                      let contentToShow = '';
                      contentToShow = splitStringForContent(cq.get('stem'));

                      return (
                        <div key={cq.get('id')} className="row  p-2 ">
                          <Link
                            to={`/cq/${cq.get('id')}`}
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
  userId: makeUserId(),
  cq: makeCqForModerator(),
  similarCqs: makeSimilarCqs(),
  inProgress: makeInProgress(),
  errorCode: makeErrorCode(),
});

const mapDispatchToProps = dispatch => ({
  fetchCQForModeration: id => dispatch(fetchCQForModeration(id)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ModeratorCqViewer);
