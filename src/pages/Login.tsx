import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import InputButton from '../Components/InputButton';

const INITIAL_STATE = {
  name: '',
  isLoading: false,
  isDisabled: true,
};

function Login() {
  const [objState, setObjState] = useState(INITIAL_STATE);

  const { name, isDisabled, isLoading } = objState;

  const navigate = useNavigate();

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setObjState((prevObj) => (
      { ...prevObj,
        name: value,
        isDisabled: (value.length < 3),
      }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setObjState({ ...objState, isLoading: true });
    const response = await createUser({ name });
    if (response === 'OK') {
      navigate('/search');
    }
  };

  return isLoading ? <Loading /> : (
    <InputButton
      type="login"
      handleOnChange={ handleOnChange }
      handleOnClick={ handleSubmit }
      isDisabled={ isDisabled }
      innerHTML="Login"
    />);
}
export default Login;
