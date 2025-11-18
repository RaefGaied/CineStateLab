import React from 'react';
import SearchSection from './components/SearchSection';
import MovieGrid from './components/MovieGrid';
import FavoritesSection from './components/FavoritesSection';
import Stats from './components/Stats';
import './styles.css';

function App() {
    return (
        <div className="App">
            <header className="header">
                <div className="container">
                    <div className="solution-badge">Redux Toolkit</div>
                    <h1>🎬 CineStateLab</h1>
                    <p>Movie Discovery with Redux Toolkit State Management</p>
                </div>
            </header>

            <main>
                <div className="container content-layout">
                    <div className="main-content">
                        <Stats />
                        <SearchSection />
                        <MovieGrid />
                    </div>
                    <aside className="favorites-sidebar">
                        <FavoritesSection />
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default App;
