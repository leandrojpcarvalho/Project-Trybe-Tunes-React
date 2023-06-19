import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { updateUser } from '../services/userAPI';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: '',
  description: '',
};

type EventForm = React.ChangeEvent<HTMLTextAreaElement>
& React.ChangeEvent<HTMLInputElement>;

type FormUserType = {
  dataUser: UserType;
  setDataUser: React.Dispatch<React.SetStateAction<UserType>>;
};

function FormUser(props: FormUserType) {
  const [formState, setFormState] = useState<UserType>(INITIAL_STATE);
  const [isDisable, setIsDisable] = useState(true);

  const nav = useNavigate();

  const { dataUser, setDataUser } = props;
  const { description, email, image, name } = dataUser;

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setDataUser(() => formState);
    if (await updateUser(formState) === 'OK') nav('/profile');
  };

  const isDataValid = () => Object.keys(formState)
    .some((key) => formState[key].length < 1);

  const handleOnChange = ({ target }: EventForm) => {
    setFormState((prevObj) => ({ ...prevObj, [target.id]: target.value }));
  };

  useEffect(() => {
    setIsDisable(() => isDataValid());
  }, [formState]);
  return (
    <form action="">
      <img src={ image } alt="foto Atual" />
      <div>
        <label htmlFor="photo">Foto</label>
        <input
          data-testid="edit-input-image"
          type="text"
          name=""
          id="image"
          onChange={ handleOnChange }
        />
        <div>
          <label htmlFor="name">Nome</label>
          <input
            data-testid="edit-input-name"
            id="name"
            type="text"
            onChange={ handleOnChange }
          />
          <label htmlFor="email">E-mail</label>
          <input
            data-testid="edit-input-email"
            type="email"
            id="email"
            onChange={ handleOnChange }
          />
        </div>
        <label htmlFor="description">Descrição</label>
        <textarea
          data-testid="edit-input-description"
          id="description"
          cols={ 45 }
          rows={ 2 }
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
    </form>
  );
}

export default FormUser;
