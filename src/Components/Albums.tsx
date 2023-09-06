import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AlbumType } from '../types';

function Albums(props: AlbumType) {
  const { artworkUrl100, collectionName, collectionId } = props;
  return (
    <StyledCard>
      <section>
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
      </section>
    </StyledCard>
  );
}

const StyledCard = styled.section`
  display: flex;
  margin: 0 auto;
  background-color: #ffffff7d;
  section{
    display: grid;
    grid-template-rows: 1fr 3fr;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding: 10px 40px;
    margin: 10px 0;
    box-shadow: 1px 1px 3px gray;
    width: 50vh;
    border-radius: 10px;
    a{
      text-decoration: none;
      color: black;
    }
    img{
      width: 150px
    }
  }
`;

export default Albums;
