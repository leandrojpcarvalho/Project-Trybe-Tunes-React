import { useEffect, useState } from 'react';

type ListMusicProp = {
  previewUrl: string;
  trackName: string;
  trackId: number;
  handleIsFavorite: (event: React.ChangeEvent<HTMLInputElement>) => void;
  listFavoriteIds: number[];
};

function ListMusic(props: ListMusicProp) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { previewUrl, trackName, trackId,
    handleIsFavorite, listFavoriteIds } = props;
  useEffect(() => {
    if (listFavoriteIds.some((songId) => songId === trackId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [listFavoriteIds, trackId]);

  const trackIdString = trackId.toString();
  return (
    <>
      <label htmlFor={ trackIdString } data-testid={ `checkbox-music-${trackIdString}` }>
        <img
          src={ isFavorite
            ? '/src/images/checked_heart.png' : '/src/images/empty_heart.png' }
          alt="favorite"
        />
      </label>
      <input
        type="checkbox"
        name=""
        id={ trackIdString }
        onChange={ handleIsFavorite }
        checked={ isFavorite }
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
