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

class TeacherManagement extends Component {
  static propTypes = {
    eiin: PropTypes.number,
    pendingTeachers: PropTypes.object,
    approvedTeachers: PropTypes.object,
    fetchPendingList: PropTypes.func,
    fetchApprovedList: PropTypes.func,
    fetchTeacherInfo: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      view: false,
      teacherDetails: '',
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
    const user = await API.get(`/api/headmaster/teacher/${id}`);
    if (user) {
      this.setState({ teacherDetails: user });
    }
    this.onToggle();
  };

  render() {
    const { pendingTeachers, approvedTeachers } = this.props;

    return (
      <div>
        <TeacherTable
          type={TableType.PENDING}
          teacherList={pendingTeachers}
          onViewClick={this.viewUserInformation}
        />
        <br />
        <TeacherTable
          type={TableType.APPROVED}
          teacherList={approvedTeachers}
          onViewClick={this.viewUserInformation}
        />

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
