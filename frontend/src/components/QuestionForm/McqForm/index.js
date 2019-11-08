/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { reduxForm, FieldArray, Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';

import { FormSelect, FormInput } from 'components/FormComponent';
import { McqType } from 'containers/CreateQuestion/Question';

class McqForm extends Component {
  static propTypes = {
    mcqType: PropTypes.string.isRequired,
    classes: PropTypes.object,
    subjects: PropTypes.object,
    chapters: PropTypes.object,
    selectedClass: PropTypes.object,
    selectedSubject: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
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

  prepareChapters = chapters => {
    const { selectedSubject } = this.props;
    return chapters
      .filter(
        chapter =>
          selectedSubject &&
          chapter.get('subjectId') === selectedSubject.get('value')
      )
      .map(chapter => ({
        label: chapter.get('chapterName'),
        value: chapter.get('id'),
      }));
  };

  renderRightAnswer = (extraName = '') => {
    return (
      <div className="mt-2">
        <label>সঠিক উত্তর</label>
        <div>
          <label>
            <Field
              name={`${extraName}answer`}
              component="input"
              type="radio"
              value="1"
            />
            (ক)
          </label>
          {'    '}
          <label>
            <Field
              name={`${extraName}answer`}
              component="input"
              type="radio"
              value="2"
            />
            (খ)
          </label>
          <label>
            <Field
              name={`${extraName}answer`}
              component="input"
              type="radio"
              value="3"
            />
            (গ)
          </label>
          {'    '}
          <label>
            <Field
              name={`${extraName}answer`}
              component="input"
              type="radio"
              value="4"
            />
            (ঘ)
          </label>
          {'    '}
        </div>
      </div>
    );
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
      {this.renderRightAnswer(generalMcq)}
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
    const {
      classes,
      subjects,
      selectedClass,
      selectedSubject,
      mcqType,
      chapters,
      handleSubmit,
      submitting,
      valid,
      pristine,
    } = this.props;

    const mcqName =
      mcqType === McqType.GENERAL
        ? 'সাধারণ বহুনির্বাচনী'
        : mcqType === McqType.POLYNOMIAL
        ? 'বহুপদী সমাপ্তিসূচক'
        : 'অভিন্ন তথ্যভিত্তিক';
    return (
      <div className="jumbotron">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <FormSelect
                name="class"
                label="শ্রেণী"
                options={this.prepareClasses(classes)}
              />
            </div>
            <div className="col">
              <FormSelect
                name="subjectId"
                label="বিষয়"
                placeholder={
                  selectedClass ? 'Select subject' : 'Please select class first'
                }
                disabled={selectedClass ? false : true}
                options={this.prepareSubjects(subjects)}
              />
            </div>
            <div className="col">
              <FormSelect
                name="chapterId"
                label="অধ্যায়"
                placeholder={
                  selectedSubject
                    ? 'Select chapter'
                    : 'Please select subject first'
                }
                disabled={selectedSubject ? false : true}
                options={this.prepareChapters(chapters)}
              />
            </div>
          </div>

          <fieldset className="border p-2">
            <legend className="w-auto">{mcqName}</legend>
            {mcqType === McqType.GENERAL && this.renderGeneralMcq()}
            {mcqType === McqType.POLYNOMIAL && this.renderPolynomialMcq()}
            {mcqType === McqType.STEM && this.renderStemBasedMcq()}
          </fieldset>

          <FormInput name="weight" label="নম্বর" type="number" />
          <div className="mt-2">
            <label>স্তর</label>
            <div>
              <label>
                <Field
                  name="difficulty"
                  component="input"
                  type="radio"
                  value="easy"
                />
                সহজ স্তর
              </label>
              {'    '}
              <label>
                <Field
                  name="difficulty"
                  component="input"
                  type="radio"
                  value="standard"
                />
                মধ্যম স্তর
              </label>
              <label>
                <Field
                  name="difficulty"
                  component="input"
                  type="radio"
                  value="hard"
                />
                কঠিন স্তর
              </label>
              {'    '}
            </div>
          </div>
          <div>
            <button
              disabled={!valid || pristine || submitting}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
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
