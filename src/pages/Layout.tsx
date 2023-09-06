import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../Components/Header';
import { UserType } from '../types';

function Layout(prop: { objUser : UserType }) {
  const { objUser } = prop;
  const { name } = objUser;
  return (
    <>
      <Header name={ name } />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  form{
    margin: 15px 10px;
    grid-template-columns: 3fr 1fr;
    input{
      width:100%;
    }
  }
  p{
    margin: 15px 10px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export default Layout;
