export const Movie = {
    id: 0,
    title: '',
    year: '',
    poster: '',
    rating: 0,
    genre: [],
    isFavorite: false,
};

export const initialState = {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedGenre: '',
};
