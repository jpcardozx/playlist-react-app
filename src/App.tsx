import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Playlists from './components/Playlists';
import Favorites from './components/Favorites';
import CuratedMusicList from './components/CuratedMusicList'; // Adicionar o novo componente
import { getToken, searchPlaylists } from './api/spotify';
import './App.css';

interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

const App: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Playlist[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>('');

  // Fetch playlists from Spotify API using query and token
  const handleSearch = async (query: string, page = 1) => {
    if (!token) {
      console.error('Token not found');
      return;
    }

    // Prevent empty search queries
    if (!query.trim()) {
      setError('Search query is empty.');
      return;
    }

    try {
      setLoading(true);
      setError(null); // Reset previous errors

      const results = await searchPlaylists(query, token, page);
      setPlaylists(results);
    } catch (err) {
      setError('Error fetching playlists.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch token and load favorites from localStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getToken();
        if (accessToken) {
          setToken(accessToken);
        } else {
          setError('Error fetching authentication token.');
        }
      } catch (err) {
        setError('Authentication error.');
        console.error('Error fetching token:', err);
      }
    };

    fetchToken();

    // Load favorites from localStorage if available
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Toggle favorite playlists
  const toggleFavorite = (playlist: Playlist) => {
    let updatedFavorites;

    if (favorites.some(fav => fav.id === playlist.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== playlist.id);
    } else {
      updatedFavorites = [...favorites, playlist];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Pagination component for navigating through search results
  const Pagination = () => (
    <div className="pagination">
      <button 
        onClick={() => { handleSearch(query, page - 1); setPage(page - 1); }} 
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button onClick={() => { handleSearch(query, page + 1); setPage(page + 1); }}>
        Next Page
      </button>
    </div>
  );

  // Render search results or display loading and error states
  const renderResults = () => (
    <>
      {loading && <div className="spinner-container"><div className="spinner"></div></div>}
      {error && <p>{error}</p>}
      {!loading && playlists.length > 0 && (
        <>
          <Playlists
            playlists={playlists}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <Pagination />
        </>
      )}
    </>
  );

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={(query) => { setQuery(query); handleSearch(query); }} />
                {renderResults()}
              </>
            }
          />
          <Route
            path="/playlists"
            element={<Playlists playlists={playlists} favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/search"
            element={
              <>
                <SearchBar onSearch={(query) => { setQuery(query); handleSearch(query); }} />
                {renderResults()}
              </>
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          {/* Nova rota para a página de curadoria de músicas */}
          <Route
            path="/curated-music"
            element={<CuratedMusicList />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
