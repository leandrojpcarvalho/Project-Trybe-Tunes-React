import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { UserType } from '../types';
import Loading from './Loading';
import { useUser } from './Layout';

function Profile(props: UserType) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const { email, description, image, name } = user;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    isLoading ? <Loading /> : (
      <ProfileStyled>
        <div>
          <div className="all-info">
            <img src={ image } alt="sua foto" data-testid="profile-image" />
            <div className="info">
              <p>{`Nome: ${name}`}</p>
              <p>{ `E-mail: ${email}` }</p>
              <p>{ `Descrição: ${description}` }</p>
            </div>
          </div>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </ProfileStyled>)
  );
}

const ProfileStyled = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 94%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: 1px 1px 3px gray;
  background-color: #ffffffa4;
  .all-info{
    display: flex;
    .info{
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }
  img{
    width:150px;
    border-radius: 100%
  }
`;

export default Profile;
