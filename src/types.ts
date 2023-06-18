export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type Favorite = {
  [key: string]: boolean;
};

export type InitialStateFavorite = {
  favoriteSongs: SongType[];
  isLoading: boolean;
};

export type PropsFavorite = {
  handleIsFavorite: (id: string, songs: SongType[]) => void;
  getIsFavorite: () => Promise<SongType[]>;
  objIsFavorite: Favorite;
};
