import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Loading from './Loading';
import { SongType } from '../types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import ListMusic from '../Components/ListMusic';
import { Banner, MarginAuto, ShowList } from '../Components/StyledComponents/style';
import { useUser } from './Layout';

const INITIAL_STATE = {
  favoriteSongsIds: [] as number[],
  favoriteSongs: [] as SongType[],
};

function Favorites() {
  const [favoriteState, setFavoriteState] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteColor, setFavoriteColor] = useState<string>('');
  const { backgrounds: { favoritePage } } = useUser();

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
    if (favoritePage !== '') setFavoriteColor(favoritePage);
  }, []);

  return (
    isLoading ? <Loading /> : (
      <ShowList>
        <MarginAuto>
          <div className="mid">
            <Banner defaultValue={ favoriteColor }>
              <h2>Suas Musicas favoritas</h2>
            </Banner>
          </div>
          <div className="show">
            {favoriteSongs.length === 0 ? <h4>Poxa! sem nada por aqui!</h4> : (
              favoriteSongs.map((song) => (<ListMusic
                key={ song.trackId }
                handleIsFavorite={ handleIsFavorite }
                listFavoriteIds={ favoriteSongsIds }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                trackName={ song.trackName }
              />)))}
          </div>
        </MarginAuto>
      </ShowList>
    )
  );
}

export default Favorites;
