import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import Loading from '../pages/Loading';
import ListMusic from './ListMusic';

const INITIAL_STATE = {
  albumInfo: {} as AlbumType,
  songs: [] as SongType[],
  isLoading: false,
};

function Album() {
  const [objState, setObjState] = useState(INITIAL_STATE);
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
          {songs.map((song) => <ListMusic key={ song.trackId } { ...song } />)}
        </ol>
      </section>
    </section>));
}

export default Album;
