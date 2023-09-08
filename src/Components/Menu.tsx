import { useState } from 'react';
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
        <div>
          <ConfigurationButton
            className="close"
            onClick={ handleToggle }
            defaultValue={ close }
            aria-hidden="true"
          />
        </div>
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

export default Menu;
