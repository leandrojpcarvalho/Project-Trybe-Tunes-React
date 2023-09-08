import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AlbumType } from '../types';

function Albums(props: AlbumType) {
  const { artworkUrl100, collectionName, collectionId } = props;
  const nav = useNavigate();
  return (
    <StyledCard>
      <section onClick={ () => nav(`/album/${collectionId}`) } aria-hidden="true">
        <h3>{ collectionName }</h3>
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
  cursor: pointer;
  section{
    display: grid;
    max-width: min-content;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding: 10px 40px;
    margin: 10px 0;
    box-shadow: 1px 1px 3px gray;
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
