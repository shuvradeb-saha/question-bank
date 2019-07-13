import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Header from 'components/Header';
import { SideBar, AdminContent, AccessDenied } from 'components';
import { logout } from 'state/login/action';
import { makeUserName, makeRoles } from 'state/login/selectors';
import { Roles } from 'containers/App/constants';

class HomePage extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    roles: ImmutablePropTypes.list.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    username: 'User',
    roles: [],
  };

  onLogout = () => {
    const { logout } = this.props;
    localStorage.clear();
    logout();
  };

  render() {
    const { roles, username } = this.props;

    return (
      <div>
        <Header username={username} onLogout={this.onLogout} />
        <div className="container-fluid">
          <div className="row">
            <SideBar roles={roles.toJS()} />
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
              <div className="container mt-3">
                <div>
                  {roles.toJS().includes(Roles.ADMIN) ? (
                    <AdminContent />
                  ) : (
                    <AccessDenied />
                  )}
                </div>
              </div>
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
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(withConnect(HomePage));
