import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import InputButton from '../Components/InputButton';
import Loading from './Loading';
import Albums from '../Components/Albums';
import { styled } from 'styled-components';

type ObjState = {
  name: string;
  artistName: string;
  isDisabled: boolean;
  isLoading: boolean
  objArtist: AlbumType[];
};

const INITIAL_STATE = {
  name: '',
  artistName: '',
  isDisabled: true,
  isLoading: false,
  objArtist: [],
};

function Search() {
  const [stateControl, setStateControl] = useState<ObjState>(INITIAL_STATE);

  const { objArtist, isDisabled, isLoading, name, artistName } = stateControl;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempNameArtist = event.target.value;
    setStateControl((prevObj) => ({ ...prevObj,
      name: tempNameArtist,
      isDisabled: (tempNameArtist.length < 2),
    }));
  };

  const handleSubmit = (event :React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    getArtist();
  };

  const getArtist = async () => {
    setStateControl((prevObj) => ({ ...prevObj, isLoading: true }));
    if (name !== '') {
      const artist = await searchAlbumsAPI(name);
      setStateControl((prevObj) => ({ ...prevObj,
        artistName: name,
        objArtist: artist,
      }));
      setStateControl((prevObj) => ({ ...prevObj, name: '', isLoading: false }));
    }
  };
  return isLoading ? <Loading />
    : (
      <>
        <InputButton
          type="search"
          handleOnChange={ handleOnChange }
          handleOnClick={ handleSubmit }
          isDisabled={ isDisabled }
          innerHTML="Pesquisar"
        />
        { objArtist.length === 0 ? (
          <p>
            Nenhum álbum foi encontrado
          </p>) : (
            <section className="artist">
              <p>{ `Resultado de álbuns de: ${artistName}`}</p>
              <AlbunsStyled>
                { objArtist
                  .map((album) => <Albums key={ album.collectionId } { ...album } />) }
              </AlbunsStyled>
            </section>)}
      </>
    );
}

const AlbunsStyled = styled.section`
  display:flex;
  flex-flow: column nowrap;
  overflow: auto;
`;

export default Search;
