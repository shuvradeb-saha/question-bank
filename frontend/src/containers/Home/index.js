import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from "react-immutable-proptypes";
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Header from 'components/Header';
import { SideBar } from 'components';
import { makeUserName, makeRoles } from 'state/login/selectors';

class HomePage extends Component {

  static popTypes = {
    username: PropTypes.string.isRequired,
    roles: ImmutablePropTypes.list.isRequired
  }

  static defaultProps = {
    username: "User",
    roles:[]
  }

  render() {
    const {roles, username} = this.props;
    
    return (
      <div>
        <Header username={username} />
        <div className="container-fluid">
          <div className="row">
            <SideBar roles={roles.toJS()} />
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
              <h1>Body </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeUserName(),
  roles: makeRoles(),
});
const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);

