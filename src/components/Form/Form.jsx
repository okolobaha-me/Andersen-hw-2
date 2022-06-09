import { Component } from 'react';
import s from './Form.module.css';
import * as fieldValidation from '../../utils/fieldValidation';

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
    isValid: {
      name: true,
      lastName: true,
      birthDate: true,
      phone: true,
      website: true,
      about: true,
      tech: true,
      project: true,
    },
  };

  handleChange = e => {
    const fieldName = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setFieldValue(fieldName, value);
  };

  setFieldValue = (fieldName, value) => {
    this.setState(prev => ({ values: { ...prev.values, [fieldName]: value } }));
  };

  onBlurValidate = e => {
    const fieldName = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (fieldName) {
      case 'name':
      case 'lastName':
        console.log(fieldValidation.name(value));
        break;
      default:
        break;
    }
  };

  render() {
    //Destructuring values
    const { name, lastName, birthDate, phone, website, about, tech, project } =
      this.state.values;

    return (
      <form className={s.form}>
        <div className={s.nameWrapper}>
          <label className={s.filed}>
            <span className={s.filedName}>Имя</span>
            <input
              aria-invalid={true}
              required
              className={s.input}
              name="name"
              type="text"
              id="name"
              placeholder={'Введите имя'}
              onChange={this.handleChange}
              value={name}
              onBlur={this.onBlurValidate}
            />
          </label>
          <label className={s.filed}>
            <span className={s.filedName}>Фамилия</span>
            <input
              required
              className={s.input}
              name="lastName"
              type="text"
              id="lastName"
              placeholder={'Введите фамилию'}
              onChange={this.handleChange}
              value={lastName}
              onBlur={this.onBlurValidate}
            />
          </label>
        </div>
        <label className={s.filed}>
          <span className={s.filedName}>Дата рождения</span>
          <input
            required
            className={s.input}
            name="birthDate"
            type="date"
            id="birthDate"
            placeholder={'Ввыберите дату рождения'}
            onChange={this.handleChange}
            value={birthDate}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Телефон</span>
          <input
            required
            className={s.input}
            name="phone"
            type="tel"
            id="phone"
            placeholder={'Укажите ваш телефон'}
            onChange={this.handleChange}
            value={phone}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Сайт</span>
          <input
            required
            className={s.input}
            name="website"
            type="url"
            id="website"
            placeholder={'Укажите ваш сайт'}
            onChange={this.handleChange}
            value={website}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>О себе</span>
          <textarea
            required
            className={s.input}
            rows={7}
            name="about"
            id="about"
            placeholder={'Расскажите в кратце о себе'}
            onChange={this.handleChange}
            value={about}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Стек технологий</span>
          <textarea
            required
            className={s.input}
            rows={7}
            name="tech"
            id="tech"
            placeholder={'Напишите технологии с которыми вы работали'}
            onChange={this.handleChange}
            value={tech}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Описание последнего проекта</span>
          <textarea
            required
            className={s.input}
            rows={7}
            name="project"
            id="project"
            placeholder={'Опишите ваш последний проект'}
            onChange={this.handleChange}
            value={project}
          />
        </label>
        <div className={s.formControlWrapper}>
          <button type="button" className={s.formControl}>
            Отмена
          </button>
          <button type="submit" className={s.formControl}>
            Сохранить
          </button>
        </div>
      </form>
    );
  }
}
