import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, Favorite, SongType } from '../types';
import Loading from '../pages/Loading';
import ListMusic from './ListMusic';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

const INITIAL_STATE = {
  albumInfo: {} as AlbumType,
  songs: [] as SongType[],
  isLoading: false,
};

function Album() {
  const [objState, setObjState] = useState(INITIAL_STATE);
  const [objIsFavorite, setObjIsFavorite] = useState<Favorite>({});

  const albumId = useParams().id;

  const { albumInfo, isLoading, songs } = objState;
  const { artistName, artworkUrl100, collectionName } = albumInfo;
  useEffect(() => {
    const getAlbum = async () => {
      setObjState((prevObj: any) => ({ ...prevObj, isLoading: true }));
      if (albumId) {
        const response = await getMusics(albumId);
        const musics = response.slice(1);
        const [album] = response;
        setObjState((prevObj: any) => {
          const tempState = ({ ...prevObj,
            albumInfo: album,
            songs: musics,
            isLoading: false,
          });
          return tempState;
        });
      }
    };
    getAlbum();
  }, [albumId]);

  const handleObjIsFavorite = async (trackId: string) => {
    const current = objIsFavorite[trackId];
    setObjIsFavorite((prevObj) => ({ ...prevObj, [trackId]: !current }));
    await addAndRemoveFavorite(trackId);
  };
  const addAndRemoveFavorite = async (trackId: string) => {
    const [objSong] = (songs.filter((song) => song.trackId === Number(trackId)));
    let isValid = '';
    try {
      if (!objIsFavorite[trackId]) {
        isValid = await addSong(objSong);
        if (isValid !== 'OK') throw new Error('erro ao adicionar música');
      } else {
        isValid = await removeSong(objSong);
        if (isValid !== 'OK') throw new Error('erro ao remover música');
      }
      await removeSong(objSong);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (isLoading ? <Loading /> : (
    <section className="album">
      <section className="albuminfo">
        <h2 data-testid="album-name">
          { collectionName }
        </h2>
        <h4 data-testid="artist-name">
          { artistName }
        </h4>
        <img
          src={ artworkUrl100 }
          alt=""
        />
        <ol className="songs">
          {songs
            .map((song) => {
              const { previewUrl, trackId, trackName } = song;
              return (<ListMusic
                key={ song.trackId }
                previewUrl={ previewUrl }
                trackId={ trackId }
                trackName={ trackName }
                handleIsFavorite={ handleObjIsFavorite }
                objIsFavorite={ objIsFavorite }
              />);
            })}
        </ol>
      </section>
    </section>));
}

export default Album;
