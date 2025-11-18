import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import '../styles.css';

const Stats = () => {
    const { movies, favorites, selectedGenre } = useMovieContext();

    const filteredCount = movies.filter(movie => {
        if (selectedGenre === 'All' || !selectedGenre) return true;
        return movie.genre.includes(selectedGenre);
    }).length;

    const averageRating = movies.length > 0
        ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
        : '0.0';

    return (
        <div className="stats">
            <div className="stat-item">
                <span className="stat-value">{filteredCount}</span>
                <span className="stat-label">Movies</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{favorites.length}</span>
                <span className="stat-label">Favorites</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{averageRating}</span>
                <span className="stat-label">Avg Rating</span>
            </div>
        </div>
    );
};

export default Stats;
