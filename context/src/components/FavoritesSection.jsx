import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import '../styles.css';

const FavoritesSection = () => {
    const { favorites, toggleFavorite } = useMovieContext();
    const hasFavorites = favorites.length > 0;

    return (
        <div className="favorites-section">
            <h2 className="section-title">
                ⭐ My Favorites{hasFavorites ? ` (${favorites.length})` : ''}
            </h2>

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
                                    {movie.year} • {movie.rating?.toFixed?.(1) || movie.rating}/10
                                </div>
                                <div className="favorite-genres">
                                    {movie.genres?.slice(0, 2).join(' • ')}
                                </div>
                            </div>
                            <button
                                className="favorite-remove"
                                onClick={() => toggleFavorite(movie.id)}
                                aria-label={`Remove ${movie.title} from favorites`}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">💔</div>
                    <p>No favorite movies yet. Start adding some!</p>
                </div>
            )}
        </div>
    );
};

export default FavoritesSection;
