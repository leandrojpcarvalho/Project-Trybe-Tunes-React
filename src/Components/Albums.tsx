import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

function Albums(props: AlbumType) {
  const { artworkUrl100, collectionName, collectionId } = props;
  return (
    <section className="album">
      <div className="backgroud">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <h3>{ collectionName }</h3>
        </Link>
        <img
          src={ artworkUrl100 }
          alt={ `foto do album ${collectionName}` }
        />
      </div>
    </section>
  );
}

export default Albums;
