import { Component } from 'react';
import s from './Form.module.css';
import * as formValidation from '../../utils/formValidation';
import { TextInput } from './TextInput/TextInput';
import { Title } from '../Title/Title';
import PropTypes from 'prop-types';
import { maskPhone } from '../../utils/phoneMask';

export class Form extends Component {
  state = {
    values: {
      name: '',
      lastName: '',
      birthDate: '',
      phone: '',
      website: '',
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
    const value =
      fieldName === 'phone'
        ? e.currentTarget.value.replaceAll('-', '')
        : e.currentTarget.value;
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
        this.setIsValidField(fieldName, formValidation.textInput(value));
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
            name: name === 'notEntered' ? 'empty' : name,
            lastName: lastName === 'notEntered' ? 'empty' : lastName,
            birthDate: birthDate === 'notEntered' ? 'empty' : birthDate,
            phone: phone === 'notEntered' ? 'empty' : phone,
            website: website === 'notEntered' ? 'empty' : website,
            about: about === 'notEntered' ? 'empty' : about,
            tech: tech === 'notEntered' ? 'empty' : tech,
            project: project === 'notEntered' ? 'empty' : project,
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
        <Title title={'Создание анкеты'} />

        <form className={s.form} onSubmit={this.handleSubmit}>
          <div className={s.nameWrapper}>
            {/*name input*/}
            <label className={s.filed}>
              <span className={s.filedName}>Имя</span>
              <input
                aria-invalid={true}
                className={s.input}
                name="name"
                type="text"
                id="name"
                placeholder={'Введите имя'}
                onChange={this.handleChange}
                value={name}
                onBlur={this.validate}
              />
              {isValid.name === 'empty' && (
                <span className={s.error}>Это поле обязательно</span>
              )}
              {isValid.name === 'invalid' && (
                <span className={s.error}>
                  Имя должно начинаться с большой буквы
                </span>
              )}
            </label>

            {/*last name input*/}
            <label className={s.filed}>
              <span className={s.filedName}>Фамилия</span>
              <input
                className={s.input}
                name="lastName"
                type="text"
                id="lastName"
                placeholder={'Введите фамилию'}
                onChange={this.handleChange}
                value={lastName}
                onBlur={this.validate}
              />
              {isValid.lastName === 'empty' && (
                <span className={s.error}>Это поле обязательно</span>
              )}
              {isValid.lastName === 'invalid' && (
                <span className={s.error}>
                  Фамилия должна начинаться с большой буквы
                </span>
              )}
            </label>
          </div>

          {/*birthdate input*/}
          <label className={s.filed}>
            <span className={s.filedName}>Дата рождения</span>
            <input
              className={s.input}
              name="birthDate"
              type="date"
              id="birthDate"
              placeholder={'Ввыберите дату рождения'}
              onChange={this.handleChange}
              value={birthDate}
              onBlur={this.validate}
            />
            {isValid.birthDate === 'empty' && (
              <span className={s.error}>Это поле обязательно</span>
            )}
          </label>

          {/*phone input*/}
          <label className={s.filed}>
            <span className={s.filedName}>Телефон</span>
            <input
              className={s.input}
              name="phone"
              type="tel"
              id="phone"
              placeholder={'Укажите ваш телефон'}
              onChange={this.handleChange}
              value={maskPhone(phone)}
              onBlur={this.validate}
            />
            {isValid.phone === 'empty' && (
              <span className={s.error}>Это поле обязательно</span>
            )}
            {isValid.phone === 'invalid' && (
              <span className={s.error}>
                В телефоне не может быть больше 9 цыфр
              </span>
            )}
          </label>

          {/*website input*/}
          <label className={s.filed}>
            <span className={s.filedName}>Сайт</span>
            <input
              className={s.input}
              name="website"
              type="url"
              id="website"
              placeholder={'Укажите ваш сайт'}
              onChange={this.handleChange}
              value={website}
              onBlur={this.validate}
            />
            {isValid.website === 'empty' && (
              <span className={s.error}>Это поле обязательно</span>
            )}
            {isValid.website === 'invalid' && (
              <span className={s.error}>
                Сайт должен начинаться с "https://"
              </span>
            )}
          </label>

          {/*about yourself input*/}
          <TextInput
            title={'О себе'}
            onBlur={this.validate}
            isValid={isValid.about}
            onChange={this.handleChange}
            name={'about'}
            value={about}
          />

          {/*technologies stack input*/}
          <TextInput
            title={'Стек технологий'}
            onBlur={this.validate}
            isValid={isValid.tech}
            onChange={this.handleChange}
            name={'tech'}
            value={tech}
          />

          {/*last project input*/}
          <TextInput
            title={'Описание последнего проекта'}
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
              Отмена
            </button>
            <button type="submit" className={s.formControl}>
              Сохранить
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
