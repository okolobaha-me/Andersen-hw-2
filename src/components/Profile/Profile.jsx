import PropTypes from 'prop-types';
import { Title } from '../Title/Title';
import s from './Profile.module.css';
import { maskPhone } from '../../utils/phoneMask';

export const Profile = ({ data }) => {
  const { name, lastName, birthDate, phone, website, about, tech, project } =
    data;

  return (
    <>
      <Title title={`${name} ${lastName}`} />
      <p className={s.text}>
        <span className={s.fieldName}>Дата рождения: </span> {birthDate}
      </p>
      <p className={s.text}>
        <span className={s.fieldName}>Телефон: </span> {maskPhone(phone)}
      </p>
      <p className={s.text}>
        <span className={s.fieldName}>Сайт: </span> {website}
      </p>
      <p className={s.text}>
        <span className={s.fieldName}>О себе: </span> {about}
      </p>
      <p className={s.text}>
        <span className={s.fieldName}>Стэк технологий: </span> {tech}
      </p>
      <p className={s.text}>
        <span className={s.fieldName}>О последнем проекте: </span> {project}
      </p>
    </>
  );
};

Profile.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
