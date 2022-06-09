import { Title } from './Title/Title';
import { Form } from './Form/Form';
import s from './App.module.css';

export const App = () => {
  return (
    <div className={s.container}>
      <Title title={'Создание анкеты'} />
      <Form />
    </div>
  );
};
