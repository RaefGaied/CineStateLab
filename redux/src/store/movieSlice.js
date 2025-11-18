import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';

const initialState = {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedGenre: '',
};

const getGenreName = (genreId) => {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western',
    };
    return genres[genreId] || 'Unknown';
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();

        return data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: new Date(movie.release_date).getFullYear().toString(),
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image',
            rating: movie.vote_average,
            genre: movie.genre_ids.map(id => getGenreName(id)),
            isFavorite: false,
        }));
    }
);

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (searchQuery, { getState }) => {
        if (!searchQuery.trim()) {
            const { dispatch } = getState();
            dispatch(fetchMovies());
            return;
        }

        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();

        return data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: new Date(movie.release_date).getFullYear().toString(),
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image',
            rating: movie.vote_average,
            genre: movie.genre_ids.map(id => getGenreName(id)),
            isFavorite: false,
        }));
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const movieId = action.payload;
            const movie = state.movies.find(m => m.id === movieId);

            if (movie) {
                movie.isFavorite = !movie.isFavorite;

                if (movie.isFavorite) {
                    state.favorites.push(movie);
                } else {
                    state.favorites = state.favorites.filter(f => f.id !== movieId);
                }
            }
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch movies';
            })
            .addCase(searchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to search movies';
            });
    },
});

export const { toggleFavorite, setSearchQuery, setSelectedGenre } = movieSlice.actions;
export default movieSlice.reducer;
