import { Outlet, useOutletContext } from 'react-router-dom';
import { styled } from 'styled-components';
import { useState } from 'react';
import Header from '../Components/Header';
import { UserType } from '../types';
import bgPage from '../images/bg-image.jpg';

type ContextOutletStoreType = {
  user: UserType;
  backgrounds: Backgrounds,
  setBackgrounds: (param: Backgrounds) => void;
};

type Backgrounds = {
  wallPaper: string;
  favoritePage: string;
};

const INITIAL_STATE_BACKGROUNDS = {
  favoritePage: '#3f281df3',
  wallPaper: bgPage,
} as Backgrounds;

function Layout(prop: { objUser : UserType }) {
  const [backgrounds, setBackgrounds] = useState(INITIAL_STATE_BACKGROUNDS);
  const { objUser: user } = prop;

  const { name } = user;
  return (
    <StyleBackGround style={ { backgroundImage: `url(${backgrounds.wallPaper})` } }>
      {/* <img className="background" src={ backgrounds.wallPaper } alt="" /> */}
      <Header name={ name } />
      <Main>
        <Outlet
          context={
            { user, backgrounds, setBackgrounds } as ContextOutletStoreType
          }
        />
      </Main>
    </StyleBackGround>
  );
}

export function useUser() {
  return useOutletContext<ContextOutletStoreType>();
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 75.4vh;
  .mid{
    height: 12vh;
    width: auto;
    margin: 10px;
    text-align: center;
  }
  p{
    margin: 15px 10px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const StyleBackGround = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-position: center;
  background-size:cover;
  background-repeat: no-repeat;
  /* .background{
    position: absolute;
    height:100vh;
    z-index: -1;
    opacity: 0.6;
  } */
`;

export default Layout;
