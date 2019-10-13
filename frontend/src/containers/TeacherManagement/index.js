import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { UserInformationModal } from 'components/Modals';
import { TeacherTable } from 'components';
import { TableType } from './TableType';
import { makeEiin } from 'state/login/selectors';
import { makeApprovedList, makePendingList } from 'state/headmaster/selectors';
import {
  fetchPendingTeachers,
  fetchApprovedTeachers,
} from 'state/headmaster/action';

import API from 'utils/api';
import { toastError } from 'components/Toaster';

class TeacherManagement extends Component {
  static propTypes = {
    type: PropTypes.symbol.isRequired,
    eiin: PropTypes.number,
    pendingTeachers: PropTypes.object,
    approvedTeachers: PropTypes.object,
    fetchPendingList: PropTypes.func,
    fetchApprovedList: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teacherDetails: '',
      viewInProgress: { id: -1, status: false },
    };
  }

  componentDidMount() {
    const { eiin, fetchApprovedList, fetchPendingList } = this.props;
    fetchPendingList(eiin);
    fetchApprovedList(eiin);
  }

  onToggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  viewUserInformation = async id => {
    this.setState({ viewInProgress: { id: id, status: true } });
    this.onToggle();
    const user = await API.get(`/api/headmaster/teacher/${id}`);
    if (user) {
      this.setState({
        teacherDetails: user,
        viewInProgress: { id: -1, status: false },
      });
    } else {
      toastError(`Unable to load user with id ${id}`);
      this.onToggle();
      return;
    }
  };

  PendingInfo = () => (
    <TeacherTable
      type={TableType.PENDING}
      teacherList={this.props.pendingTeachers}
      onViewClick={this.viewUserInformation}
      viewInProgress={this.state.viewInProgress}
    />
  );

  ApprovedInfo = () => (
    <TeacherTable
      type={TableType.APPROVED}
      teacherList={this.props.approvedTeachers}
      onViewClick={this.viewUserInformation}
      viewInProgress={this.state.viewInProgress}
    />
  );

  render() {
    return (
      <div>
        {this.props.type === TableType.APPROVED && <this.ApprovedInfo />}
        {this.props.type === TableType.PENDING && <this.PendingInfo />}
        <UserInformationModal
          details={this.state.teacherDetails}
          isOpen={this.state.modal}
          toggle={this.onToggle}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  eiin: makeEiin(),
  pendingTeachers: makePendingList(),
  approvedTeachers: makeApprovedList(),
});

const mapDispatchToProps = dispatch => ({
  fetchPendingList: eiin => dispatch(fetchPendingTeachers(eiin)),
  fetchApprovedList: eiin => dispatch(fetchApprovedTeachers(eiin)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TeacherManagement);
