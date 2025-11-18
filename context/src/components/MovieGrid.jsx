import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import '../styles.css';

const MovieGrid = () => {
    const { movies, loading, error, selectedGenre, toggleFavorite } = useMovieContext();

    const filteredMovies = movies.filter(movie => {
        if (selectedGenre === 'All' || !selectedGenre) return true;
        return movie.genre.includes(selectedGenre);
    });

    if (loading) {
        return <div className="loading">Loading movies...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (filteredMovies.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🎬</div>
                <p>No movies found</p>
            </div>
        );
    }

    return (
        <div className="movies-grid">
            {filteredMovies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleFavorite={toggleFavorite}
                />
            ))}
        </div>
    );
};

export default MovieGrid;
