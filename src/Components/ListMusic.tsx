import { Favorite } from '../types';

type ListMusicProp = {
  previewUrl: string;
  trackName: string;
  trackId: number;
  handleIsFavorite: (id:string) => void;
  objIsFavorite: Favorite;
};

function ListMusic(props: ListMusicProp) {
  const { previewUrl, trackName, trackId, handleIsFavorite, objIsFavorite } = props;
  const trackIdString = trackId.toString();

  return (
    <>
      <label htmlFor={ trackIdString } data-testid={ `checkbox-music-${trackIdString}` }>
        <img
          src={ objIsFavorite[trackIdString]
            ? '/src/images/checked_heart.png' : '/src/images/empty_heart.png' }
          alt="favorite"
        />
      </label>
      <input
        type="checkbox"
        name=""
        id={ trackIdString }
        onChange={ (event) => handleIsFavorite(event.target.id) }
        checked={ objIsFavorite[trackIdString] }
      />
      <li>{trackName}</li>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        { previewUrl }
        <code>audio</code>
      </audio>
    </>
  );
}

export default ListMusic;
