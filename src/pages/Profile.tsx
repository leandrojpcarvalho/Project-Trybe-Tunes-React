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
  console.log(image);
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
              <p>Nome:</p>
              <p>{name}</p>
              <p>E-mail:</p>
              <p>{email}</p>
              <p>Descrição:</p>
              <p>{description}</p>
            </div>
          </div>
          <div>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        </div>
      </ProfileStyled>)
  );
}

const ProfileStyled = styled.section`

  max-width: 900px;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 94%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 20px 0px;
  box-shadow: 1px 1px 3px gray;
  background-color: #ffffffa4;
  .all-info{
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 30px 0;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
    .info{
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      @media screen and (max-width: 500px) {
        align-items: center;
        margin: 20px 0;
      }
    }
    .info :nth-child(2n){
      width: 200px;
      height: 25px;
      border-radius: 10px;
      background-color: #f5f5f5da;
      box-shadow: 1px 1px 3px darkgray;
      @media screen and (max-width: 500px) {
        margin:0;
      }
    }
  }
  img{
    @media screen and (max-width: 500px) {
      max-width: 200px;
    };
    max-width: 250px;
    min-width: 100px;
    height: fit-content;
    border-radius: 100%
  }
  a{
    text-decoration: none;
    background-color: #ffb855;
    color: black;
    font-weight: bolder;
    box-shadow: 1px 1px 3px darkgray;
    padding:10px 20px;
    font-size: 1.5rem;
    border-radius: 10px 0;
  }
  
  `;

export default Profile;
