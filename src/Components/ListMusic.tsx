import { SongType } from '../types';

function ListMusic(props: SongType) {
  const { previewUrl, trackName } = props;
  return (
    <>
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
