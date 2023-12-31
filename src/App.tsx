import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Search from './pages/Search';
import Album from './Components/Album';
import Layout from './pages/Layout';
import { Favorite, SongType, UserType } from './types';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import FormUser from './pages/FormUser';
import { getUser } from './services/userAPI';
import userPicture from './images/user.png';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: userPicture,
  description: '',
};

function App() {
  const [objIsFavorite, setObjIsFavorite] = useState<Favorite>({});
  const [objUser, setObjUser] = useState<UserType>(INITIAL_STATE);

  const handleObjIsFavorite = async (trackId: string, songs: SongType[]) => {
    const current = objIsFavorite[trackId];
    setObjIsFavorite((prevObj) => ({ ...prevObj, [trackId]: !current }));
    const newObj = getMusicObj(trackId, songs);
    if (newObj) await addAndRemoveFavorite(newObj, !current);
  };

  const getMusicObj = (trackId: string, songs: SongType[]) => songs
    .find((song) => song.trackId === Number(trackId));

  const addAndRemoveFavorite = async (obj: SongType, isFavorite:boolean) => {
    if (isFavorite) {
      if (await addSong(obj) !== 'OK') throw new Error('erro ao adicionar música');
    } else if (await removeSong(obj) !== 'OK') {
      throw new Error('erro ao remover música');
    }
  };

  const getIsFavorite = async () => {
    const arrSongs = await getFavoriteSongs();
    arrSongs.forEach((music) => {
      setObjIsFavorite((prevObj) => ({
        ...prevObj,
        [music.trackId.toString()]: true,
      }));
    });
    return arrSongs;
  };

  useEffect(() => {
    const getUserName = async () => {
      const { name } = await getUser();
      setObjUser((curr) => ({
        ...curr,
        name,
      }));
    };
    getUserName();
  }, []);
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout { ...{ objUser } } /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/loading" element={ <Loading /> } />
        <Route path="/profile" element={ <Profile { ...objUser } /> } />
        <Route
          path="/profile/edit"
          element={ <FormUser
            dataUser={ objUser }
            setDataUser={ setObjUser }
          /> }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              getIsFavorite={ getIsFavorite }
              handleIsFavorite={ handleObjIsFavorite }
              objIsFavorite={ objIsFavorite }
            />
          }
        />
        <Route
          path="/album/:id"
          element={
            <Album
              getIsFavorite={ getIsFavorite }
              handleIsFavorite={ handleObjIsFavorite }
              objIsFavorite={ objIsFavorite }
            />
        }
        />
      </Route>
    </Routes>
  );
}

export default App;
