import React from 'react';
import useMovieStore from '../store/movieStore';
import '../styles.css';

const FavoritesSection = () => {
    const { favorites, toggleFavorite } = useMovieStore();
    const hasFavorites = favorites.length > 0;

    return (
        <div className="favorites-section">
            <h2 className="section-title">⭐ My Favorites</h2>
            {hasFavorites ? (
                <div className="favorites-list">
                    {favorites.map(movie => (
                        <div className="favorite-card" key={movie.id}>
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="favorite-thumb"
                            />
                            <div className="favorite-details">
                                <div className="favorite-title">{movie.title}</div>
                                <div className="favorite-meta">
                                    {movie.year} • {movie.rating.toFixed(1)}/10
                                </div>
                                <div className="favorite-genres">
                                    {movie.genre?.slice(0, 2).join(' • ')}
                                </div>
                            </div>
                            <button
                                className="favorite-remove"
                                onClick={() => toggleFavorite(movie.id)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No favorite movies yet.</p>
                    <p>Start adding some favorites to see them here!</p>
                </div>
            )}
        </div>
    );
};

export default FavoritesSection;
