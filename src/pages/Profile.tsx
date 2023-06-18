import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  userName: {} as UserType,
  isLoading: true,
};

function Profile() {
  const [objState, setObState] = useState(INITIAL_STATE);

  useEffect(() => {
    const getUserName = async () => {
      const userName = await getUser();
      setObState((prevObj) => ({
        ...prevObj,
        isLoading: false,
        userName,
      }));
    };
    getUserName();
  }, []);

  const { isLoading, userName } = objState;
  const { description, email, image, name } = userName;
  return (
    isLoading ? <Loading /> : (
      <section className="user">
        <h3>{ name }</h3>
        <div>
          <img src={ image } alt="sua foto" data-testid="profile-image" />
          <Link to="/profile/edit">Editar perfil</Link>
          <ul>
            <li>{ email }</li>
            <li>{ description }</li>
          </ul>
        </div>
      </section>)
  );
}

export default Profile;
