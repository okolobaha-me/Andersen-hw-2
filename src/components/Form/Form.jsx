import { Component } from 'react';
import s from './Form.module.css';
import * as formValidation from '../../utils/formValidation';
import { TextArea } from './TextArea/TextArea';
import { Title } from '../Title/Title';
import PropTypes from 'prop-types';
import { VALIDATION_MESSAGES } from '../../utils/formValidation';
import { Input } from './Input/Input';
import { maskPhone } from '../../utils/phoneMask';

const { NOT_ENTERED, EMPTY } = VALIDATION_MESSAGES;

export class Form extends Component {
  state = {
    values: {
      name: '',
      lastName: '',
      birthDate: '',
      phone: '',
      website: 'https://',
      about: '',
      tech: '',
      project: '',
    },
    validStatus: {
      name: VALIDATION_MESSAGES.NOT_ENTERED,
      lastName: VALIDATION_MESSAGES.NOT_ENTERED,
      birthDate: VALIDATION_MESSAGES.NOT_ENTERED,
      phone: VALIDATION_MESSAGES.NOT_ENTERED,
      website: VALIDATION_MESSAGES.NOT_ENTERED,
      about: VALIDATION_MESSAGES.NOT_ENTERED,
      tech: VALIDATION_MESSAGES.NOT_ENTERED,
      project: VALIDATION_MESSAGES.NOT_ENTERED,
    },
  };

  setFieldValue = (fieldName, value) => {
    this.setState(prev => ({ values: { ...prev.values, [fieldName]: value } }));
  };

  setIsValidField = (fieldName, value) => {
    this.setState(prev => ({
      validStatus: { ...prev.validStatus, [fieldName]: value },
    }));
  };

  handleChange = e => {
    const fieldName = e.currentTarget.name;
    let value = e.currentTarget.value;

    if (fieldName === 'phone') {
      //remove hyphens from phone number
      value = value.replaceAll('-', '');

      //avoid adding something except numbers to phone value
      const lastSymbol = value[value.length - 1];
      if (
        !formValidation.validPhoneSymbols.includes(lastSymbol) &&
        !!value.length
      )
        return;
    }

    this.setFieldValue(fieldName, value);

    this.validate(e);
  };

  validate = e => {
    const fieldName = e.currentTarget.name;
    const value = e.currentTarget.value.trim();

    switch (fieldName) {
      case 'name':
      case 'lastName':
        this.setIsValidField(fieldName, formValidation.name(value));
        break;

      case 'phone':
        this.setIsValidField(fieldName, formValidation.phone(value));
        break;

      case 'birthDate':
        this.setIsValidField(fieldName, formValidation.date(value));
        break;

      case 'website':
        this.setIsValidField(fieldName, formValidation.webSite(value));
        break;

      case 'about':
      case 'tech':
      case 'project':
        this.setIsValidField(fieldName, formValidation.textArea(value));
        break;

      default:
        break;
    }
  };

  clearForm = () => {
    this.setState({
      values: {
        name: '',
        lastName: '',
        birthDate: '',
        phone: '',
        website: 'https://',
        about: '',
        tech: '',
        project: '',
      },
      validStatus: {
        name: 'notEntered',
        lastName: 'notEntered',
        birthDate: 'notEntered',
        phone: 'notEntered',
        website: 'notEntered',
        about: 'notEntered',
        tech: 'notEntered',
        project: 'notEntered',
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!formValidation.isValidForm(Object.values(this.state.validStatus))) {
      this.setState(prev => {
        const {
          name,
          lastName,
          birthDate,
          phone,
          website,
          about,
          tech,
          project,
        } = prev.validStatus;

        return {
          validStatus: {
            name: name === NOT_ENTERED ? EMPTY : name,
            lastName: lastName === NOT_ENTERED ? EMPTY : lastName,
            birthDate: birthDate === NOT_ENTERED ? EMPTY : birthDate,
            phone: phone === NOT_ENTERED ? EMPTY : phone,
            website: website === NOT_ENTERED ? EMPTY : website,
            about: about === NOT_ENTERED ? EMPTY : about,
            tech: tech === NOT_ENTERED ? EMPTY : tech,
            project: project === NOT_ENTERED ? EMPTY : project,
          },
        };
      });
      return;
    }

    this.props.onSubmit(this.state.values);
  };

  render() {
    //Destructuring values
    const { name, lastName, birthDate, phone, website, about, tech, project } =
      this.state.values;

    const isValid = this.state.validStatus;

    return (
      <>
        <Title title={'???????????????? ????????????'} />

        <form className={s.form} onSubmit={this.handleSubmit}>
          <div className={s.nameWrapper}>
            {/*name input*/}
            <Input
              title={'??????'}
              fieldName={'name'}
              type={'text'}
              placeholder={'?????????????? ??????'}
              value={name}
              onChange={this.handleChange}
              validate={this.validate}
              isValid={isValid.name}
            />

            {/*last name input*/}
            <Input
              title={'??????????????'}
              fieldName={'lastName'}
              type={'text'}
              placeholder={'?????????????? ??????????????'}
              value={lastName}
              onChange={this.handleChange}
              validate={this.validate}
              isValid={isValid.lastName}
            />
          </div>

          {/*birthdate input*/}
          <Input
            title={'???????? ????????????????'}
            fieldName={'birthDate'}
            type={'date'}
            placeholder={'?????????????????? ???????? ????????????????'}
            value={birthDate}
            onChange={this.handleChange}
            validate={this.validate}
            isValid={isValid.birthDate}
          />

          {/*phone input*/}
          <Input
            title={'??????????????'}
            fieldName={'phone'}
            type={'tel'}
            placeholder={'?????????????? ?????? ??????????????'}
            value={maskPhone(phone)}
            onChange={this.handleChange}
            validate={this.validate}
            isValid={isValid.phone}
          />

          {/*website input*/}
          <Input
            title={'????????'}
            fieldName={'website'}
            type={'url'}
            placeholder={'?????????????? ?????? ????????'}
            value={website}
            onChange={this.handleChange}
            validate={this.validate}
            isValid={isValid.website}
          />

          {/*about yourself input*/}
          <TextArea
            title={'?? ????????'}
            onBlur={this.validate}
            isValid={isValid.about}
            onChange={this.handleChange}
            name={'about'}
            value={about}
          />

          {/*technologies stack input*/}
          <TextArea
            title={'???????? ????????????????????'}
            onBlur={this.validate}
            isValid={isValid.tech}
            onChange={this.handleChange}
            name={'tech'}
            value={tech}
          />

          {/*last project input*/}
          <TextArea
            title={'???????????????? ???????????????????? ??????????????'}
            onBlur={this.validate}
            isValid={isValid.project}
            onChange={this.handleChange}
            name={'project'}
            value={project}
          />

          {/*form controls*/}
          <div className={s.formControlWrapper}>
            <button
              type="button"
              className={s.formControl}
              onClick={this.clearForm}
            >
              ????????????
            </button>
            <button type="submit" className={s.formControl}>
              ??????????????????
            </button>
          </div>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
