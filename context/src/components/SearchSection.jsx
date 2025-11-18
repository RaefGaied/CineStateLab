import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import '../styles.css';

const genres = [
    'All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
];

const SearchSection = () => {
    const {
        searchQuery,
        selectedGenre,
        setSearchQuery,
        setSelectedGenre,
        searchMovies,
        loading
    } = useMovieContext();

    const handleSearch = () => {
        searchMovies();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-section">
            <div className="container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search movies by title..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <select
                        className="genre-select"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        {genres.map(genre => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
