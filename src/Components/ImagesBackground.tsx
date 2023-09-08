import styled from 'styled-components';
import { PicturesData } from '../images/bgimages/bgloctions';
import { Backgrounds } from '../pages/Layout';

type PropType = {
  backgrounds: Backgrounds;
  setBackgrounds: (param: Backgrounds) => void;
};

function ImagesBackground({ setBackgrounds, backgrounds }: PropType){
  const handleChangeBackground = (pictureName: string) => {
    setBackgrounds(({
      ...backgrounds,
      wallPaper: pictureName,
    }));
  };

  return (
    <BackgroundBar className="wrapped-container">
      {PicturesData
        .map((picture, index) => (
          <Picture
            className="wrapped-element"
            key={ index }
            defaultValue={ picture }
            onClick={ () => handleChangeBackground(picture) }
            aria-hidden="true"
          />))}
    </BackgroundBar>
  );
}

const BackgroundBar = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: -webkit-fill-available;
  /* div:hover {
    border: 4px solid black;
    transition: 1s ease-in-out;
  } */
`;

const Picture = styled.div`
  display: flex;
  border: 4px solid transparent;
  background-size: cover;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  background-image: ${({defaultValue}: string) => `url(${defaultValue})` }
`;

export default ImagesBackground;
