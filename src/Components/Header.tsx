import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
    <header data-testid="header-component">
      <div>
        <img src="" alt="logo trybe" />
        <h2>TrybeTunes</h2>
        <p data-testid="header-user-name">{ userName }</p>
      </div>
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        {' '}
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        {' '}
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
    </header>)
  );
}

export default Header;
