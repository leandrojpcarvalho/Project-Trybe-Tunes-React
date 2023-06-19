import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <h2><p data-testid="header-user-name">{name}</p></h2>
        <div>
          <img src={ image } alt="sua foto" data-testid="profile-image" />
          <Link to="/profile/edit">Editar perfil</Link>
          <div>
            <p>{ email }</p>
            <p>{ description }</p>
          </div>
        </div>
      </section>)
  );
}

export default Profile;
