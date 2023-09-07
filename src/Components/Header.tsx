import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import { H1 } from './StyledComponents/style';

function Header({ name }: { name: string }) {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const setUser = async () => {
    const user = await getUser();
    setUserName(user.name);
    setIsLoading(false);
  };
  useEffect(() => {
    setUser();
  }, [name]);
  return (isLoading ? <Loading /> : (
    <HeaderGlass data-testid="header-component">
      <HeaderStyled>
        <H1>TrybeTunes</H1>
        <p data-testid="header-user-name">
          Bem vindo,
          {' '}
          <span>
            {userName}
          </span>
        </p>
      </HeaderStyled>
      <Nav>
        <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        {' '}
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        {' '}
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </Nav>
    </HeaderGlass>)
  );
}

const HeaderStyled = styled.div`
 
  height: 18vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  
  span{
    color:#ff9000;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  justify-items: center;
  padding: 10px;
  a{
    text-decoration: none;
    border: 1px solid transparent;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    color: #000000e2;
    box-shadow: 1px 2px 3px gray;
  }
`;

const HeaderGlass = styled.header`
@media screen and (min-width: 900px){
  min-width: 472px;
  max-width: 1200px;
}
  margin: 0 auto;
    /* From https://css.glass */
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.2px);
  -webkit-backdrop-filter: blur(6.2px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export default Header;
