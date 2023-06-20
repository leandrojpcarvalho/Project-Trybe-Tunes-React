import { useEffect, useState } from 'react';
import ListMusic from '../Components/ListMusic';
import Loading from './Loading';
import { SongType } from '../types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

const INITIAL_STATE = {
  favoriteSongsIds: [] as number[],
  favoriteSongs: [] as SongType[],
};

function Favorites() {
  const [favoriteState, setFavoriteState] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  const SetFavoriteInitialState = async () => {
    const favoriteSongs = await getFavoriteSongs();
    if (favoriteSongs) {
      const favoriteSongsIds = favoriteSongs.map((song) => song.trackId);
      setFavoriteState((prevObj) => ({
        ...prevObj,
        favoriteSongs,
        favoriteSongsIds,
      }));
      setIsLoading(false);
    }
  };

  const { favoriteSongsIds, favoriteSongs } = favoriteState;

  const addAndRemoveDB = async (songId: number) => {
    const objSong = favoriteSongs.find((song) => song.trackId === songId);

    if (!objSong) throw new Error('Musica não está definido');

    if (!favoriteSongsIds.includes(objSong.trackId)) {
      await addSong(objSong);
    } else {
      await removeSong(objSong);
    }
    SetFavoriteInitialState();
  };

  const handleIsFavorite = async ({
    target: { id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const idSong = Number(id);
    await addAndRemoveDB(idSong);

    const isNewFavoriteList = favoriteSongsIds
      .filter((songId) => songId !== idSong);

    setFavoriteState({ ...favoriteState,
      favoriteSongsIds: isNewFavoriteList,
    });
  };

  useEffect(() => {
    SetFavoriteInitialState();
  }, []);

  return (
    isLoading ? <Loading /> : (
      <ul>
        {favoriteSongs.length === 0 ? <h4>Poxa! sem nada por aqui!</h4> : (
          favoriteSongs.map((song) => (<ListMusic
            key={ song.trackId }
            handleIsFavorite={ handleIsFavorite }
            listFavoriteIds={ favoriteSongsIds }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            trackName={ song.trackName }
          />)))}
      </ul>
    )
  );
}

export default Favorites;
