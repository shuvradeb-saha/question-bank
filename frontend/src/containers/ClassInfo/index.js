/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { MDBDataTable } from 'mdbreact';
import { reset } from 'redux-form';

import { ClassRegisterModal } from 'components/Modals';
import { fetchAllClass, fetchClass, saveClass } from 'state/admin/action';
import { makeClasses, makeClassDetail } from 'state/admin/selectors';

class ClassInfo extends Component {
  static propTypes = {
    fetchAllClass: PropTypes.func,
    fetchClass: PropTypes.func,
    classes: PropTypes.object,
    classDetails: PropTypes.object,
    resetForm: PropTypes.func,
    saveClass: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      edit: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllClass();
  }

  onClassSubmit = values => {
    this.props.saveClass(values.toJS());
    this.setState({ modal: false });
  };

  onEditClick = id => {
    this.props.fetchClass(id);
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: true,
    }));
  };

  onCreateClick = () => {
    this.props.resetForm();
    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
    }));
  };

  createDataForTable = () => {
    const { classes } = this.props;
    const columns = [
      {
        label: 'Class Name',
        field: 'className',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 200,
      },
    ];
    const rows = classes.map(cls => ({
      clsName: cls.get('name'),
      action: (
        <span>
          <button
            className="btn btn-sm btn-outline-info"
            onClick={() => this.onEditClick(cls.get('id'))}
          >
            Edit
          </button>
          {/*  <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => this.onEditClick(cls.get('id'))}
          >
            Remove+{cls.get('id')}
          </button> */}
        </span>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={this.onCreateClick}>
              Create Class
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
        <ClassRegisterModal
          isOpen={this.state.modal}
          isUpdate={false}
          toggle={this.onCreateClick}
          onClassSubmit={this.onClassSubmit}
          initialValues={this.state.edit ? this.props.classDetails : {}}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  classes: makeClasses(),
  classDetails: makeClassDetail(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllClass: () => dispatch(fetchAllClass()),
  fetchClass: id => dispatch(fetchClass(id)),
  resetForm: () => dispatch(reset('userForm')),
  saveClass: data => dispatch(saveClass(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ClassInfo);
