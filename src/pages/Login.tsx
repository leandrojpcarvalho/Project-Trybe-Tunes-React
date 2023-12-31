import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import InputButton from '../Components/InputButton';
import { BgDiv, H1, PropFormGrid } from '../Components/StyledComponents/style';

const INITIAL_STATE = {
  name: '',
  isLoading: false,
  isDisabled: true,
};

function Login() {
  const [objState, setObjState] = useState(INITIAL_STATE);

  const { name, isDisabled, isLoading } = objState;

  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
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
  const value = { defaultValue: {
    columns: [1, 2], rows: [1, 2], form: 'login', type: '' },
  } as PropFormGrid;

  return isLoading ? <Loading /> : (
    <BgDiv>
      <H1>TrybeTunes</H1>
      <div className="login-inputs">
        <InputButton
          type="login"
          handleOnChange={ handleOnChange }
          handleOnClick={ handleSubmit }
          isDisabled={ isDisabled }
          innerHTML="Login"
          value={ value }
        />
      </div>
    </BgDiv>
  );
}

export default Login;
