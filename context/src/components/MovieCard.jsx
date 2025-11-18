import React from 'react';
import '../styles.css';

const MovieCard = ({ movie, onToggleFavorite }) => {
    return (
        <div className="movie-card">
            <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
                }}
            />
            <button
                className={`favorite-btn ${movie.isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(movie.id)}
                aria-label="Toggle favorite"
            >
                {movie.isFavorite ? '★' : '☆'}
            </button>
            <div className="movie-info">
                <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
                <div className="movie-rating">
                    <span className="rating-stars">{'★'.repeat(Math.round(movie.rating / 2))}</span>
                    <span>{movie.rating.toFixed(1)}/10</span>
                </div>
                <div className="movie-genres">
                    {movie.genre.slice(0, 2).map((g, index) => (
                        <span key={index} className="genre-tag">
                            {g}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
