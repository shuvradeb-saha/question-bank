import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { fetchMcq } from 'state/question/action';

class McqViewer extends Component {
  static propTypes = {
    match: PropTypes.any,
    fetchMcq: PropTypes.func,
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchMcq(id);
  }

  render() {
    console.log('id', this.props.match.params.id);

    return <div>McqViewer</div>;
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  fetchMcq: id => dispatch(fetchMcq(id)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(McqViewer);
