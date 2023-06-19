import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';

function Profile(props: UserType) {
  const [isLoading, setIsLoading] = useState(true);
  const { email, description, image, name } = props;

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
