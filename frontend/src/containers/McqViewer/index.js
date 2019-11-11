import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader-spinner';
import { fetchMcq } from 'state/question/action';
import {
  makeMcq,
  makeInProgress,
  makeErrorCode,
} from 'state/question/selectors';

import { AccessDenied, NotFound, MCQ } from 'components';

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
        return <MCQ mcq={mcq} />;
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
