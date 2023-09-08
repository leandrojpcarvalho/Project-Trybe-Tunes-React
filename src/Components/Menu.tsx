import { useState } from 'react';
import styled from 'styled-components';
import { ConfigurationButton, ModalWrapper } from './StyledComponents/style';
import close from '../images/fechar.png';
import gearImage from '../images/gear.png';
import ImagesBackground from './ImagesBackground';
import { Backgrounds } from '../pages/Layout';

type PropType = {
  backgrounds: Backgrounds;
  setBackgrounds: (param: Backgrounds) => void;
};

function Menu({ backgrounds, setBackgrounds }: PropType) {
  const [show, setShow] = useState(false);
  console.log(setBackgrounds);

  const handleToggle = () => {
    setShow(!show);
  };

  const modalChangeBackground = () => {
    return (
      <ModalWrapper className="fade">
        <ConfigurationButton
          className="close"
          onClick={ handleToggle }
          defaultValue={ close }
          aria-hidden="true"
        />
        <p>Selecione um Papel de parede</p>
        <ImagesBackground
          backgrounds={ backgrounds }
          setBackgrounds={ setBackgrounds }
        />
      </ModalWrapper>
    );
  };

  return (
    show
      ? (modalChangeBackground())
      : (<ConfigurationButton
          onClick={ handleToggle }
          defaultValue={ gearImage }
          aria-hidden="true"
      />)
  );
}

const Test = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: red;
  align-items: center;
  justify-content: center;
`;

export default Menu;
