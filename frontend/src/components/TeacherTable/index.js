import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableType } from 'containers/TeacherManagement/TableType';
import { MDBDataTable } from 'mdbreact';
import { fromJS } from 'immutable';

export default class TeacherTable extends Component {
  static propTypes = {
    type: PropTypes.symbol.isRequired,
    teacherList: PropTypes.object.isRequired,
    onViewClick: PropTypes.func,
  };

  static defaultProps = {
    teacherList: fromJS([]),
  };

  createDataForTable = () => {
    const { type, teacherList, onViewClick } = this.props;
    const columns = [
      {
        label: 'Teacher Name',
        field: 'teacherName',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100,
      },
    ];

    const rows = teacherList.map(teacher => ({
      teacherName: teacher.get('fullName'),
      email: teacher.get('email'),
      action: (
        <span>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onViewClick(teacher.get('id'))}
          >
            View
          </button>
          {type === TableType.PENDING && (
            <span>
              <button
                className="btn btn-sm btn-success"
                //onClick={() => this.onEditClick(teacher.get('id'))}
              >
                Allocate Subject
              </button>
            </span>
          )}
          {type === TableType.APPROVED && (
            <button
              className="btn btn-sm btn-danger"
              //onClick={() => this.onEditClick(teacher.get('id'))}
            >
              Remove
            </button>
          )}
        </span>
      ),
    }));
    return { columns, rows: rows.toJS() };
  };

  render() {
    const { type } = this.props;
    const classOfHeader = type === TableType.PENDING ? 'bg-info' : 'bg-success';
    return (
      <div className="card">
        <div className={`card-header ${classOfHeader}`}>
          <b>
            {type === TableType.PENDING
              ? TableType.PENDING.description
              : TableType.APPROVED.description}
          </b>
        </div>
        <div className="card-body">
          <MDBDataTable
            striped
            bordered
            small
            data={this.createDataForTable()}
          />
        </div>
      </div>
    );
  }
}
