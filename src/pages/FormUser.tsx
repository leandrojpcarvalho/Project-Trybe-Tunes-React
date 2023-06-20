import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: 'https://icons8.com.br/icon/20563/avatar',
  description: '',
};

type EventForm = React.ChangeEvent<HTMLTextAreaElement>
& React.ChangeEvent<HTMLInputElement>;

type FormUserType = {
  setDataUser: React.Dispatch<React.SetStateAction<UserType>>;
};

function FormUser(props: FormUserType) {
  const [formState, setFormState] = useState<UserType>(INITIAL_STATE);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  const { setDataUser } = props;
  useEffect(() => {
    const setUser = async () => {
      const userData = await getUser();
      setFormState(userData);
      setIsLoading(false);
    };
    setUser();
  }, []);

  const isDataValid = () => Object.keys(formState)
    .some((key) => formState[key as keyof UserType].length < 1);

  const { description, email, image, name } = formState;

  const handleSubmit = async () => {
    // event.preventDefault();
    setIsLoading(true);
    setDataUser(formState);
    setFormState(formState);
    await updateUser(formState);
    nav('/profile');
  };

  const handleOnChange = ({ target }: EventForm) => {
    setFormState((prevObj) => ({ ...prevObj, [target.id]: target.value }));
    setIsDisable(isDataValid());
  };

  return (isLoading ? <Loading /> : (
    <form action="">
      <img src="https://img.icons8.com/?size=150&id=20563&format=png" alt="foto Atual" />
      <div>
        <label htmlFor="photo">Foto</label>
        <input
          data-testid="edit-input-image"
          type="text"
          value={ image }
          name=""
          id="image"
          onChange={ handleOnChange }
        />
        <div>
          <label htmlFor="name">Nome</label>
          <input
            data-testid="edit-input-name"
            id="name"
            value={ name }
            type="text"
            onChange={ handleOnChange }
          />
          <label htmlFor="email">E-mail</label>
          <input
            data-testid="edit-input-email"
            type="email"
            id="email"
            value={ email }
            onChange={ handleOnChange }
          />
        </div>
        <label htmlFor="description">Descrição</label>
        <textarea
          data-testid="edit-input-description"
          id="description"
          cols={ 45 }
          rows={ 2 }
          value={ description }
          maxLength={ 100 }
          onChange={ handleOnChange }
        />
      </div>
      <button
        data-testid="edit-button-save"
        type="submit"
        onClick={ handleSubmit }
        disabled={ isDisable }
      >
        Enviar
      </button>
    </form>)
  );
}

export default FormUser;
