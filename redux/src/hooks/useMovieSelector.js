import { useSelector } from 'react-redux';

export const useMovieSelector = () => {
    return useSelector(state => state.movies);
};
