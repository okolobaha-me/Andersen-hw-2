import s from '../Form.module.css';
import * as fieldValidation from '../../../utils/formValidation';
import PropTypes from 'prop-types';

export const TextInput = ({
  name,
  onChange,
  value,
  isValid,
  onBlur,
  title,
}) => {
  return (
    <label className={s.filed}>
      <span className={s.filedName}>{title}</span>
      <textarea
        className={s.input}
        rows={7}
        name={name}
        id={name}
        placeholder={'Опишите ваш последний проект'}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {isValid === 'empty' && (
        <span className={s.error}>Это поле обязательно</span>
      )}
      {isValid === 'invalid' && (
        <span className={s.error}>
          В поле не должно быть больше 600 символов
        </span>
      )}
      <span className={s.symbolsLeft}>
        {fieldValidation.symbolsLeft(value)}
      </span>
    </label>
  );
};

TextInput.propTypes = {
  isValid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
