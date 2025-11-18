import React from 'react';
import useMovieStore from '../store/movieStore';
import MovieCard from './MovieCard';
import '../styles.css';

const MovieGrid = () => {
    const { movies, loading, error, selectedGenre, toggleFavorite } = useMovieStore();

    const filteredMovies = movies.filter(movie => {
        if (selectedGenre === 'All' || !selectedGenre) return true;
        return movie.genre.includes(selectedGenre);
    });

    if (loading) {
        return (
            <div className="movie-grid">
                <div className="loading">Loading movies...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="movie-grid">
                <div className="error">{error}</div>
            </div>
        );
    }

    if (filteredMovies.length === 0) {
        return (
            <div className="movie-grid">
                <div className="empty-state">
                    <p>🎬 No movies found</p>
                    <p>Try adjusting your search or genre filter</p>
                </div>
            </div>
        );
    }

    return (
        <div className="movie-grid">
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
