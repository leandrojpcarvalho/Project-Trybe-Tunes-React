import { AlbumType } from '../types';

const searchAlbumsAPI = async (artist: string): Promise<AlbumType[]> => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results }: { results: AlbumType[] } = await APIResponse.json();

  const response = results.map((artistInfo) => ({ ...artistInfo }));
  return response;
};

export default searchAlbumsAPI;
