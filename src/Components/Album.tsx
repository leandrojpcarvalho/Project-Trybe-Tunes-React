import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import ListMusic from './ListMusic';
import { Banner, MarginAuto, ShowList } from './StyledComponents/style';

const INITIAL_STATE = {
  albumInfo: {} as AlbumType,
  songs: [] as SongType[],
  favoriteSongsIds: [] as number[],
  isLoading: true,
};

function Album() {
  const [objState, setObjState] = useState(INITIAL_STATE);
  const { id: albumId } = useParams();

  useEffect(() => {
    const getAlbum = async () => {
      setObjState((prevObj: any) => ({ ...prevObj, isLoading: true }));
      if (albumId) {
        const favoriteSongs = await getFavoriteSongs();
        const favoriteSongsIds = favoriteSongs.map((songId) => songId.trackId);
        const response = await getMusics(albumId);
        const songs = response.slice(1);
        const [albumInfo] = response;
        setObjState((prevObj: any) => {
          const tempState = ({ ...prevObj,
            albumInfo,
            favoriteSongsIds,
            songs,
            isLoading: false,
          });
          return tempState;
        });
      }
    };
    getAlbum();
  }, [albumId]);

  const { albumInfo, isLoading, songs, favoriteSongsIds } = objState;
  const { artistName, artworkUrl100, collectionName } = albumInfo;

  const addAndRemoveDB = async (songId: number) => {
    const objSong = songs.find((song) => song.trackId === songId);

    if (!objSong) throw new Error('Musica não está definido');

    if (!favoriteSongsIds.includes(objSong.trackId)) {
      await addSong(objSong);
    } else {
      await removeSong(objSong);
    }
  };

  const handleIsFavorite = async (id: number) => {
    const idSong = Number(id);

    if (favoriteSongsIds.includes(idSong)) {
      const isNewFavoriteList = favoriteSongsIds.filter((songId) => songId !== idSong);
      setObjState({ ...objState, favoriteSongsIds: isNewFavoriteList });
    } else {
      setObjState({ ...objState, favoriteSongsIds: [...favoriteSongsIds, idSong] });
    }
    await addAndRemoveDB(idSong);
  };

  return (isLoading ? <Loading /> : (
    <MarginAuto className="album fade">
      <section className="albuminfo">
        <Banner style={ { backgroundImage: `url(${artworkUrl100})` } } className="header">
          <h2 data-testid="album-name">
            { collectionName }
          </h2>
          <h4 data-testid="artist-name">
            { artistName }
          </h4>
        </Banner>
        <h2>Músicas</h2>
        <ShowList>
          <div className="show">
            {
              songs
                .map((song) => {
                  const { previewUrl, trackId, trackName } = song;
                  return (<ListMusic
                    key={ song.trackId }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    trackName={ trackName }
                    handleIsFavorite={ handleIsFavorite }
                    listFavoriteIds={ favoriteSongsIds }
                  />);
                })
            }
          </div>
        </ShowList>
      </section>
    </MarginAuto>));
}

export default Album;
