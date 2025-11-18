import { useMovieSelector } from './useMovieSelector';
import { useMovieActions } from './useMovieActions';

export const useMovieStore = () => {
    const state = useMovieSelector();
    const actions = useMovieActions();

    return {
        ...state,
        ...actions,
    };
};
