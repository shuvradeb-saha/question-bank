import React from 'react';
export const createDataForTable = users => {
  const columns = [
    {
      label: 'User Name',
      field: 'userName',
      sort: 'asc',
      width: 150,
    },
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
      label: 'Roles',
      field: 'roles',
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
  const rows = users.map(user => ({
    userName: user.get('name'),
    instituteName: user.get('instituteName'),
    eiinNumber: user.get('eiinNumber'),
    roles: user.get('roles'),
    action: (
      <button
        className="btn btn-sm btn-outline-info"
        onClick={() => this.onEditClick(user.get('id'))}
      >
        Edit
      </button>
    ),
  }));
  return { columns, rows: rows.toJS() };
};
