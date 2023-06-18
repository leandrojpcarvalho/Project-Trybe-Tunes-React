import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, Favorite, SongType } from '../types';
import Loading from '../pages/Loading';
import ListMusic from './ListMusic';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

const INITIAL_STATE = {
  albumInfo: {} as AlbumType,
  songs: [] as SongType[],
  isLoading: false,
};

function Album() {
  const [objState, setObjState] = useState(INITIAL_STATE);
  const [objIsFavorite, setObjIsFavorite] = useState<Favorite>({});

  const { id: albumId } = useParams();

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
    getIsfavorite();
  }, [albumId]);

  const handleObjIsFavorite = async (trackId: string) => {
    const current = objIsFavorite[trackId];
    setObjIsFavorite((prevObj) => ({ ...prevObj, [trackId]: !current }));
    const newObj = getMusicObj(trackId);
    if (newObj) await addAndRemoveFavorite(newObj, !current);
  };

  const getMusicObj = (trackId: string) => songs
    .find((song) => song.trackId === Number(trackId));

  const addAndRemoveFavorite = async (obj: SongType, isFavorite:boolean) => {
    if (isFavorite) {
      if (await addSong(obj) !== 'OK') throw new Error('erro ao adicionar música');
    } else if (await removeSong(obj) !== 'OK') {
      throw new Error('erro ao remover música');
    }
  };

  const getIsfavorite = async () => {
    const arrSongs = await getFavoriteSongs();
    arrSongs
      .forEach((music) => {
        setObjIsFavorite((prevObj) => ({ ...prevObj, [music.trackId.toString()]: true }));
      });
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
