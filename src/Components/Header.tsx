import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import { H1, Nav } from './StyledComponents/style';
import NavMenu from './NavMenu';

type PropType = {
  name: string;
};

function Header({ name }: PropType) {
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
        <div className="responsive-nav-before-600 fade">
          <NavMenu />
        </div>
        <H1>TrybeTunes</H1>
        <p data-testid="header-user-name">
          Bem vindo,
          {' '}
          <span>
            {userName}
          </span>
        </p>
      </HeaderStyled>
      <Nav className="responsive-nav-after-600 fade">
        <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        {' '}
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        {' '}
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </Nav>
    </HeaderGlass>
  )
  );
}

const HeaderStyled = styled.div`
  
  height: 18vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;

  & :nth-child(2) {
    right: 5px;
    top: 5px;
  }
  & :nth-child(1) {
    grid-column: 1/3;
  }
  & :nth-child(3) {
    grid-column: 1/3;
  }
  span{
    color:#ff9000;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const HeaderGlass = styled.header`
@media screen and (min-width: 900px){
  min-width: 472px;
  max-width: 1200px;
}
@media screen and (min-width: 600px){
    .responsive-nav-after-600{
      display:grid;
    }
    .responsive-nav-before-600{
      display:none;
    }
  }
  @media screen and (max-width: 599px){
    .responsive-nav-after-600{
      display:none;
    }
    .responsive-nav-before-600{
      display:flex;
      position: absolute;
      top: 5px;
      left: 5px;
    }
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
