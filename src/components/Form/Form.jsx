import { Component } from 'react';
import s from './Form.module.css';

export class Form extends Component {
  render() {
    return (
      <form className={s.form}>
        <div className={s.nameWrapper}>
          <label className={s.filed}>
            <span className={s.filedName}>Имя</span>
            <input
              aria-invalid={true}
              required
              className={s.input}
              name={'name'}
              type={'text'}
              id={'name'}
              placeholder={'Введите имя'}
            />
          </label>
          <label className={s.filed}>
            <span className={s.filedName}>Фамилия</span>
            <input
              required
              className={s.input}
              name={'lastName'}
              type={'text'}
              id={'lastName'}
              placeholder={'Введите фамилию'}
            />
          </label>
        </div>
        <label className={s.filed}>
          <span className={s.filedName}>Дата рождения</span>
          <input
            required
            className={s.input}
            name={'birthDate'}
            type={'date'}
            id={'birthDate'}
            placeholder={'Ввыберите дату рождения'}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Телефон</span>
          <input
            required
            className={s.input}
            name={'phone'}
            type={'tel'}
            id={'phone'}
            placeholder={'Укажите ваш телефон'}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Сайт</span>
          <input
            required
            className={s.input}
            name={'website'}
            type={'url'}
            id={'website'}
            placeholder={'Укажите ваш сайт'}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>О себе</span>
          <textarea
            required
            className={s.input}
            rows={7}
            name={'about'}
            id={'about'}
            placeholder={'Расскажите в кратце о себе'}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Стек технологий</span>
          <textarea
            required
            className={s.input}
            rows={7}
            name={'tech'}
            id={'tech'}
            placeholder={'Напишите технологии с которыми вы работали'}
          />
        </label>
        <label className={s.filed}>
          <span className={s.filedName}>Описание последнего проекта</span>
          <textarea
            required
            className={s.input}
            rows={7}
            name={'project'}
            id={'project'}
            placeholder={'Опишите ваш последний проект'}
          />
        </label>
        <div className={s.formControlWrapper}>
          <button type={'button'} className={s.formControl}>
            Отмена
          </button>
          <button type={'submit'} className={s.formControl}>
            Сохранить
          </button>
        </div>
      </form>
    );
  }
}
