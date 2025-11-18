import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState } from '../types/movie';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieContext = createContext(undefined);

const movieReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, movies: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'TOGGLE_FAVORITE':
            const updatedMovies = state.movies.map(movie =>
                movie.id === action.payload
                    ? { ...movie, isFavorite: !movie.isFavorite }
                    : movie
            );
            const movie = updatedMovies.find(m => m.id === action.payload);
            const favorites = movie?.isFavorite
                ? [...state.favorites, movie]
                : state.favorites.filter(f => f.id !== action.payload);
            return { ...state, movies: updatedMovies, favorites };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_SELECTED_GENRE':
            return { ...state, selectedGenre: action.payload };
        case 'SEARCH_SUCCESS':
            return { ...state, loading: false, movies: action.payload };
        default:
            return state;
    }
};

export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState);

    const fetchMovies = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
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

            dispatch({ type: 'FETCH_SUCCESS', payload: movies });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch movies' });
        }
    };

    const searchMovies = async () => {
        if (!state.searchQuery.trim()) {
            fetchMovies();
            return;
        }

        try {
            dispatch({ type: 'FETCH_START' });
            const response = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(state.searchQuery)}`
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

            dispatch({ type: 'SEARCH_SUCCESS', payload: movies });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: 'Failed to search movies' });
        }
    };

    const toggleFavorite = (movieId) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: movieId });
    };

    const setSearchQuery = (query) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    };

    const setSelectedGenre = (genre) => {
        dispatch({ type: 'SET_SELECTED_GENRE', payload: genre });
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const value = {
        ...state,
        fetchMovies,
        toggleFavorite,
        setSearchQuery,
        setSelectedGenre,
        searchMovies,
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
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
