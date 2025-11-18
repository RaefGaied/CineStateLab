import { useDispatch } from 'react-redux';
import { fetchMovies, searchMovies, toggleFavorite, setSearchQuery, setSelectedGenre } from '../store/movieSlice';

export const useMovieActions = () => {
    const dispatch = useDispatch();

    return {
        fetchMovies: () => dispatch(fetchMovies()),
        searchMovies: (searchQuery) => dispatch(searchMovies(searchQuery)),
        toggleFavorite: (movieId) => dispatch(toggleFavorite(movieId)),
        setSearchQuery: (query) => dispatch(setSearchQuery(query)),
        setSelectedGenre: (genre) => dispatch(setSelectedGenre(genre)),
    };
};
