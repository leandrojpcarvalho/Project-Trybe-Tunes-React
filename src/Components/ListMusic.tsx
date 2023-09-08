import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import checked from '../images/checked_heart.png';
import empty from '../images/empty_heart.png';

type ListMusicProp = {
  previewUrl: string;
  trackName: string;
  trackId: number;
  handleIsFavorite: (param: number) => void;
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
    <ListMusicStyled>
      <div className="player">
        <p>{trackName}</p>
        <ButtonFavorite onClick={ () => handleIsFavorite(trackId) }>
          <img
            src={ isFavorite
              ? checked : empty }
            alt="favorite"
          />
        </ButtonFavorite>
      </div>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        { previewUrl }
        <code>audio</code>
      </audio>
    </ListMusicStyled>
  );
}

const ListMusicStyled = styled.div`
  display:flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 15px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5fd;
  box-shadow: 1px 1px 3px darkgray;
  .player{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: 30px;
    width: 250px;
  }
  p{
    font-size:1.5rem;
    color: black;
  }
  audio{
    width: -webkit-fill-available;
    box-shadow: 1px 1px 3px darkgray;
    border-radius: 10px;
  }
`;

const ButtonFavorite = styled.button`
  border: none;
`;
export default ListMusic;
