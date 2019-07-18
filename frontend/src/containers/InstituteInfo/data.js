import React from 'react';
export const createDataForTable = institutes => {
  console.log('Institutes == ', institutes.toJS());

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
        onClick={() => this.onEditClick(institute.get('id'))}
      >
        Edit
      </button>
    ),
  }));
  return { columns, rows: rows.toJS() };
};

/* 
Import React from ‘react’;
Import ReactDOM from ‘react-dom’;
*/
