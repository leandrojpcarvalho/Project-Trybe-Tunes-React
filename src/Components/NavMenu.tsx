import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ConfigurationButton, ModalWrapper, Nav } from './StyledComponents/style';
import menuImage from '../images/menu.png';
import close from '../images/fechar.png';

function NavMenu() {
  const [show, setShow] = useState(false);

  const renderNavMenu = () => {
    return (
      <Test>
        <ModalWrapper className="fade">
          <div>
            <ConfigurationButton
              defaultValue={ close }
              onClick={ () => setShow(!show) }
              className="fade"
            />
          </div>
          <Nav className="wrapped-container">
            <NavLink
              to="/search"
              className="wrapped-element"
              onClick={ () => setShow(!show)}
            >
              Pesquisar
            </NavLink>
            {' '}
            <NavLink
              to="/favorites"
              className="wrapped-element"
              onClick={ () => setShow(!show)}
            >
              Favoritos
            </NavLink>
            {' '}
            <NavLink
              to="/profile"
              className="wrapped-element"
              onClick={ () => setShow(!show)}
            >
              Perfil
            </NavLink>
          </Nav>
        </ModalWrapper>
      </Test>
    );
  };
  return (
    show
      ? (renderNavMenu())
      : (<ConfigurationButton
          defaultValue={ menuImage }
          onClick={ () => setShow(!show) }
      />)
  );
}

const Test = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

export default NavMenu;
