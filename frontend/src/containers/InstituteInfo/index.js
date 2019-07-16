/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';

import { InstituteRegisterModal } from 'components/Modals';
import { fetchAllInstitute, saveInstitute } from 'state/admin/action';
import { makeInstitutes } from 'state/admin/selectors';

class InstituteInfo extends Component {
  static propTypes = {
    fetchAllInstitute: PropTypes.func,
    institutes: PropTypes.object,
    resetForm: PropTypes.func,
    saveInstitute: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllInstitute();
  }

  onInstituteSubmit = values => {
    this.props.saveInstitute(values.toJS());
  };

  openModalToSubmitInstitute = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  editInstituteInfo = id => {
    //load user by id from the server
    this.props.resetForm();
    console.log('id');
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: !prevState.edit,
    }));
  };

  createDataForTable = () => {
    const { institutes } = this.props;
    const columns = [
      {
        label: 'Institute Name',
        field: 'instituteName',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'EIIN Number',
        field: 'eiinNumber',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];
    const rows = institutes.map(institute => ({
      instituteName: institute.get('name'),
      eiinNumber: institute.get('eiinNumber'),
      action: (
        <button
          className="btn btn-sm btn-outline-info"
          onClick={() => this.editInstituteInfo(institute.get('id'))}
        >
          Edit
        </button>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={this.openModalToSubmitInstitute}
            >
              Create Institute
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MDBDataTable
              striped
              bordered
              small
              data={this.createDataForTable()}
            />
          </div>
        </div>
        <InstituteRegisterModal
          isOpen={this.state.modal}
          isUpdate={false}
          toggle={this.openModalToSubmitInstitute}
          onInstituteSubmit={this.onInstituteSubmit}
          initialValues={this.state.edit ? 'initialValues' : {}}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  institutes: makeInstitutes(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllInstitute: () => dispatch(fetchAllInstitute()),
  resetForm: () => dispatch(reset('userForm')),
  saveInstitute: data => dispatch(saveInstitute(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(InstituteInfo);
