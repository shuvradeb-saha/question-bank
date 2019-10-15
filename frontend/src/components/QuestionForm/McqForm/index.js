import React, { Component } from 'react';
import { reduxForm, FieldArray } from 'redux-form/immutable';
import PropTypes from 'prop-types';

import { FormSelect, FormInput } from 'components/FormComponent';
import { McqType } from 'containers/CreateQuestion/Question';

class McqForm extends Component {
  static propTypes = {
    mcqType: PropTypes.string.isRequired,
    classes: PropTypes.object,
    subjects: PropTypes.object,
    selectedClass: PropTypes.object,
  };

  prepareClasses = classes =>
    classes.map(cls => ({
      label: cls.get('name'),
      value: cls.get('id'),
    }));

  prepareSubjects = subjects => {
    const { selectedClass } = this.props;
    return subjects
      .filter(
        subject =>
          selectedClass && subject.get('classId') === selectedClass.get('value')
      )
      .map(subject => ({
        label: subject.get('name'),
        value: subject.get('id'),
      }));
  };

  renderGeneralMcq = (generalMcq = '') => (
    <span>
      <FormInput
        name={`${generalMcq}questionBody`}
        label="প্রশ্ন"
        type="textarea"
      />
      <FormInput name={`${generalMcq}option1`} label="(ক)" />
      <FormInput name={`${generalMcq}option2`} label="(খ)" />
      <FormInput name={`${generalMcq}option3`} label="(গ)" />
      <FormInput name={`${generalMcq}option4`} label="(ঘ)" />
    </span>
  );

  renderPolynomialMcq = (polynomialMcq = '') => (
    <span>
      <FormInput
        name={`${polynomialMcq}questionStatement`}
        label="অসমাপ্ত বাক্য"
        type="textarea"
      />
      <FormInput name={`${polynomialMcq}statement1`} label="(i)" />
      <FormInput name={`${polynomialMcq}statement2`} label="(ii)" />
      <FormInput name={`${polynomialMcq}statement3`} label="(iii)" />
      {this.renderGeneralMcq(polynomialMcq)}
    </span>
  );

  addGeneralMcq = ({ fields }) => (
    <div>
      {fields.map((generalMcq, index) => {
        console.log('ge', typeof generalMcq);

        return (
          <div key={index}>
            <fieldset className="border border-info p-2">
              <legend className="w-auto">{`সাধারণ বহুনির্বাচনী - ${index +
                1}`}</legend>
              <button
                className="btn btn-danger btn-sm"
                type="button"
                onClick={() => fields.remove(index)}
              >
                <i className="fa fa-trash" />
              </button>
              {this.renderGeneralMcq(`${generalMcq}.`)}
            </fieldset>
          </div>
        );
      })}
      <button
        className="btn btn-outline-info btn-md"
        type="button"
        onClick={() => fields.push()}
      >
        <i className="fa fa-plus-square" aria-hidden="true"></i>
        {'   '}
        সাধারণ বহুনির্বাচনী
      </button>
    </div>
  );

  addPolynomialMcq = ({ fields }) => (
    <div>
      {fields.map((polynomialMcq, index) => (
        <div key={index}>
          <fieldset className="border border-primary p-2">
            <legend className="w-auto">{`বহুপদী সমাপ্তিসূচক - ${index +
              1}`}</legend>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={() => fields.remove(index)}
            >
              <i className="fa fa-trash" />
            </button>
            {this.renderPolynomialMcq(`${polynomialMcq}.`)}
          </fieldset>
        </div>
      ))}
      <button
        className="btn btn-outline-primary btn-md"
        type="button"
        onClick={() => fields.push()}
      >
        <i className="fa fa-plus-square" aria-hidden="true"></i>
        {'   '}
        বহুপদী সমাপ্তিসূচক
      </button>
    </div>
  );

  renderStemBasedMcq = () => (
    <span>
      <FormInput name="stem" label="উদ্দীপক" type="textarea" />
      <div className="p-2 mb-2">
        <FieldArray name="generalMcqs" component={this.addGeneralMcq} />
      </div>

      <div className="p-2">
        <FieldArray name="polynomialMcqs" component={this.addPolynomialMcq} />
      </div>
    </span>
  );

  render() {
    const { classes, subjects, selectedClass, mcqType } = this.props;
    const mcqName =
      mcqType === McqType.GENERAL
        ? 'সাধারণ বহুনির্বাচনী'
        : mcqType === McqType.POLYNOMIAL
        ? 'বহুপদী সমাপ্তিসূচক'
        : 'অভিন্ন তথ্যভিত্তিক';
    return (
      <div className="jumbotron">
        <form>
          <FormSelect
            name="class"
            label="শ্রেণী"
            options={this.prepareClasses(classes)}
          />
          <FormSelect
            name="subject"
            label="বিষয়"
            placeholder={
              selectedClass ? 'Select Subject' : 'Please Select Class First'
            }
            disabled={selectedClass ? false : true}
            options={this.prepareSubjects(subjects)}
          />
          <fieldset className="border p-2">
            <legend className="w-auto">{mcqName}</legend>
            {mcqType === McqType.GENERAL && this.renderGeneralMcq()}
            {mcqType === McqType.POLYNOMIAL && this.renderPolynomialMcq()}
            {mcqType === McqType.STEM && this.renderStemBasedMcq()}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'mcqForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(McqForm);
