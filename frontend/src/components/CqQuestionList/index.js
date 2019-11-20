import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { splitStringForContent, extractNameObject } from 'utils/utils';

class QuestionList extends Component {
  static propTypes = {
    allCqs: PropTypes.any,
    allClass: PropTypes.any,
    allSubject: PropTypes.any,
    allChapter: PropTypes.any,
    status: PropTypes.string,
  };

  createDataForTable = (allCqs, allChapter, allClass, allSubject) => {
    const columns = [
      {
        label: 'Question',
        field: 'cq',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Class',
        field: 'className',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Subject',
        field: 'subjectName',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Chapter',
        field: 'chapterName',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Created at',
        field: 'createdAt',
        sort: 'asc',
        width: 100,
      },
    ];

    const rows = allCqs.map(cq => {
      const mainStr = cq.get('stem');
      const contentToShow = (mainStr && splitStringForContent(mainStr)) || '';

      const nameObject = extractNameObject(
        cq.get('chapterId'),
        allChapter,
        allClass,
        allSubject
      );

      const createdAt = moment(cq.get('createdAt')).format('YYYY-MM-DD');
      return {
        cq: (
          <Link to={`/cq/${cq.get('id')}`} style={{ color: 'blue' }}>
            {contentToShow}
          </Link>
        ),
        ...nameObject,
        createdAt,
      };
    });

    return { columns, rows: rows.toJS() };
  };

  render() {
    const { status, allCqs, allChapter, allClass, allSubject } = this.props;

    return (
      <span>
        <div className="card">
          <div className={`card-header bg-dark text-light`}>
            <b>
              {status === QuestionStatusType.PENDING
                ? 'Pending CQ List'
                : status === QuestionStatusType.APPROVED
                ? 'Approved CQ List'
                : 'Rejected CQ List'}
            </b>
          </div>
          <div className="card-body">
            {allCqs.size === 0 ? (
              <h5>No CQ Available</h5>
            ) : (
              <MDBDataTable
                small
                data={this.createDataForTable(
                  allCqs,
                  allChapter,
                  allClass,
                  allSubject
                )}
              />
            )}
          </div>
        </div>
      </span>
    );
  }
}

export default QuestionList;
