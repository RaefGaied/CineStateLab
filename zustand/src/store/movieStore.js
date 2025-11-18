import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';

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

const useMovieStore = create(
    devtools(
        (set, get) => ({
            movies: [],
            favorites: [],
            loading: false,
            error: null,
            searchQuery: '',
            selectedGenre: '',

            fetchMovies: async () => {
                set({ loading: true, error: null });
                try {
                    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
                    const data = await response.json();

                    const movies = data.results.map(movie => ({
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

                    set({ movies, loading: false });
                } catch (error) {
                    set({ loading: false, error: 'Failed to fetch movies' });
                }
            },

            searchMovies: async () => {
                const { searchQuery } = get();

                if (!searchQuery.trim()) {
                    get().fetchMovies();
                    return;
                }

                set({ loading: true, error: null });
                try {
                    const response = await fetch(
                        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
                    );
                    const data = await response.json();

                    const movies = data.results.map(movie => ({
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

                    set({ movies, loading: false });
                } catch (error) {
                    set({ loading: false, error: 'Failed to search movies' });
                }
            },

            toggleFavorite: (movieId) => {
                const { movies, favorites } = get();
                const updatedMovies = movies.map(movie =>
                    movie.id === movieId
                        ? { ...movie, isFavorite: !movie.isFavorite }
                        : movie
                );

                const movie = updatedMovies.find(m => m.id === movieId);
                const updatedFavorites = movie?.isFavorite
                    ? [...favorites, movie]
                    : favorites.filter(f => f.id !== movieId);

                set({ movies: updatedMovies, favorites: updatedFavorites });
            },

            setSearchQuery: (query) => {
                set({ searchQuery: query });
            },

            setSelectedGenre: (genre) => {
                set({ selectedGenre: genre });
            },
        }),
        {
            name: 'movie-store',
        }
    )
);

export default useMovieStore;
