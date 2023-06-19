import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import { UserType } from '../types';

function Layout(prop: { objUser : UserType }) {
  const { objUser } = prop;
  const { name } = objUser;
  return (
    <>
      <Header name={ name } />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
