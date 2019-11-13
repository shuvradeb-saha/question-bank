import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PDFExport } from '@progress/kendo-react-pdf';
import {
  renderGeneralViewer,
  renderPolynomialViewer,
  renderStemViewer,
} from 'components/QuestionViewer/MCQ';
import { McqType } from '../CreateQuestion/Question';

export default class index extends Component {
  static propTypes = {
    questionType: PropTypes.string,
    questionPayload: PropTypes.any,
  };
  pdfExportComponent;

  render() {
    const { questionPayload, questionType } = this.props;
    return (
      <div>
        <div className="example-config">
          <button
            className="k-button btn btn-primary"
            onClick={() => {
              this.pdfExportComponent.save();
            }}
          >
            Export PDF
          </button>
        </div>

        <div style={{ position: 'absolute', left: '-1000px', top: 0 }}>
          <PDFExport
            paperSize="A4"
            margin="1cm"
            ref={component => (this.pdfExportComponent = component)}
          >
            <div
              style={{
                width: '500px',
                fontFamily: 'Hind Siliguri, sans-serif',
              }}
            >
              {questionType === 'MCQ' ? (
                <p>
                  {questionPayload.map(mcq => {
                    return mcq.get('mcqType') === McqType.GENERAL
                      ? renderGeneralViewer(mcq)
                      : mcq.get('mcqType') === McqType.POLYNOMIAL
                      ? renderPolynomialViewer(mcq)
                      : renderStemViewer(mcq);
                  })}
                </p>
              ) : (
                <p>cq</p>
              )}
            </div>
          </PDFExport>
        </div>
      </div>
    );
  }
}
