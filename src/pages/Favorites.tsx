import { useEffect, useState } from 'react';
import ListMusic from '../Components/ListMusic';
import Loading from './Loading';
import { PropsFavorite, SongType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const INITIAL_STATE = {
  favoriteSongs: [] as SongType[],
  isLoading: true,
};

function Favorites(props:PropsFavorite) {
  const [favoriteState, setFavoriteState] = useState(INITIAL_STATE);
  const { isLoading, favoriteSongs } = favoriteState;
  const { handleIsFavorite, objIsFavorite, getIsFavorite } = props;

  useEffect(() => {
    getIsFavorite();
  }, []);

  const SetFavoriteInitialState = async () => {
    const songList = await getFavoriteSongs();
    setFavoriteState((prevObj) => ({
      ...prevObj,
      favoriteSongs: songList,
      isLoading: false,
    }));
  };

  useEffect(() => {
    SetFavoriteInitialState();
    setFavoriteState((prevObj) => ({ ...prevObj, isLoading: true }));
  }, [objIsFavorite]);
  return (
    isLoading ? <Loading /> : (
      <ul>
        {favoriteSongs.length === 0 ? <h4>Poxa! sem nada por aqui!</h4> : (
          favoriteSongs.map((song) => (<ListMusic
            key={ song.trackId }
            handleIsFavorite={ handleIsFavorite }
            objIsFavorite={ objIsFavorite }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            trackName={ song.trackName }
            songs={ favoriteSongs }
          />)))}
      </ul>
    )
  );
}

export default Favorites;
