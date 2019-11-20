import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import Loader from 'react-loader-spinner';
import { fetchCq } from 'state/question/action';
import {
  makeCq,
  makeInProgress,
  makeErrorCode,
} from 'state/question/selectors';

import { AccessDenied, NotFound, CQ } from 'components';

class CqViewer extends Component {
  static propTypes = {
    match: PropTypes.any,
    fetchCq: PropTypes.func,
    cq: PropTypes.object,
    inProgress: PropTypes.bool,
    errorCode: PropTypes.any,
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchCq(id);
  }

  render() {
    const { cq, errorCode, inProgress } = this.props;

    if (inProgress) {
      return (
        <div className="container-fluid h-100 mt-5">
          <div className="row align-items-center h-100">
            <div className="col mx-auto">
              <div className="jumbotron p-2">
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
        return <CQ cq={cq} />;
      } else {
        return (
          <div className="alert alert-warning">
            <h3>Server fault. Please reload your page.</h3>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = createStructuredSelector({
  cq: makeCq(),
  inProgress: makeInProgress(),
  errorCode: makeErrorCode(),
});

const mapDispatchToProps = dispatch => ({
  fetchCq: id => dispatch(fetchCq(id)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CqViewer);
