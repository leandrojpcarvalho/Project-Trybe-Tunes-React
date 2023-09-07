import { ReactElement, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import { Button, Form, Input, MarginAuto } from '../Components/StyledComponents/style';
import { useUser } from './Layout';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: 'https://icons8.com.br/icon/20563/avatar',
  description: '',
  wallPaper: '',
  favoritePage: '',
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
  const { backgrounds, setBackgrounds } = useUser();

  const nav = useNavigate();

  const { setDataUser } = props;
  useEffect(() => {
    const setUser = async () => {
      const { name } = await getUser();
      const newData = {
        ...formState,
        ...backgrounds,
        name,
      };
      setFormState(newData);
      setIsLoading(false);
    };
    setUser();
  }, []);

  const isDataValid = () => Object.keys(formState)
    .some((key) => formState[key as keyof UserType].length < 1);

  const { description, email, image, name, wallPaper, favoritePage } = formState;

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setDataUser(formState);
    setFormState(formState);
    setBackgrounds({
      favoritePage,
      wallPaper,
    });
    await updateUser(formState);
    nav('/profile');
  };

  const handleOnChange = ({ target }: EventForm) => {
    setFormState((prevObj) => ({ ...prevObj, [target.id]: target.value }));
    setIsDisable(isDataValid());
  };

  const value = { columns: [1, 1], rows: [1, 3], form: 'editar' };

  return (isLoading ? <Loading /> : (
    <Form defaultValue={ value }>
      <img src="https://img.icons8.com/?size=150&id=20563&format=png" alt="foto Atual" />
      <div>
        <ResponsiveLabel htmlFor="photo">Foto</ResponsiveLabel>
        <MarginAuto>
          <Input
            data-testid="edit-input-image"
            type="text"
            value={ image }
            name=""
            id="image"
            onChange={ handleOnChange }
            placeholder="Insira a URL de uma foto"
          />
          <ResponsiveLabel htmlFor="name">Nome</ResponsiveLabel>
          <Input
            data-testid="edit-input-name"
            id="name"
            value={ name }
            type="text"
            onChange={ handleOnChange }
            placeholder="Insira como você quer ser chamado"
          />
          <ResponsiveLabel htmlFor="wallPaper">Imagem de Fundo</ResponsiveLabel>
          <Input
            data-testid="edit-input-name"
            id="wallPaper"
            value={ wallPaper }
            type="text"
            onChange={ handleOnChange }
            placeholder="Insira como você quer ser chamado"
          />

          <ResponsiveLabel htmlFor="favoritePage">Mural de favoritos</ResponsiveLabel>
          <Input
            data-testid="edit-input-name"
            id="favoritePage"
            value={ favoritePage }
            type="text"
            onChange={ handleOnChange }
            placeholder="Insira como você quer ser chamado"
          />

          <ResponsiveLabel htmlFor="email">E-mail</ResponsiveLabel>
          <Input
            data-testid="edit-input-email"
            type="email"
            id="email"
            value={ email }
            onChange={ handleOnChange }
            placeholder="Insira o seu e-mail"

          />
          <ResponsiveLabel htmlFor="description">Descrição</ResponsiveLabel>
          <TextArea
            data-testid="edit-input-description"
            id="description"
            cols={ 45 }
            rows={ 2 }
            value={ description }
            maxLength={ 100 }
            onChange={ handleOnChange }
            placeholder="Insira um breve texto sobre você"
          />
        </MarginAuto>
      </div>
      <ButtonFormUser
        data-testid="edit-button-save"
        type="submit"
        onClick={ handleSubmit }
        disabled={ isDisable }
      >
        Enviar
      </ButtonFormUser>
    </Form>)
  );
}

const ResponsiveLabel = styled.label`
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ButtonFormUser = styled.button`
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  height: 6vh;
  width: 48vh;
`;

const TextArea = styled.textarea`
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  outline: 0;
  width: 48vh;
  border: 1px solid gray;
  box-shadow: 5px 5px 5px gray;
  border-radius: 5px;
`;

export default FormUser;
