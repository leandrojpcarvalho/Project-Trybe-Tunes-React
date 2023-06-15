import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

function Login() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isDisabled = () => name.length < 3;

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await createUser({ name });
    if (response === 'OK') {
      navigate('/search');
    }
  };

  return isLoading ? (
    <Loading />) : (
      <form>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ (event) => setName(event.target.value) }
        />
        <button
          data-testid="login-submit-button"
          disabled={ isDisabled() }
          type="submit"
          onClick={ (event) => handleSubmit(event) }
        >
          Entrar
        </button>
      </form>);
}
export default Login;
