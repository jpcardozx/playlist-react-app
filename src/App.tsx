import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Playlists from './components/Playlists';
import Favorites from './components/Favorites'; // Importe o novo componente de favoritos
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

  const handleSearch = async (query: string, page = 1) => {
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    setLoading(true);
    setError(null);
    const results = await searchPlaylists(query, token, page);
    setPlaylists(results);
    setLoading(false);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken();
      if (accessToken) {
        setToken(accessToken);
      } else {
        setError('Erro ao obter o token de autenticação.');
      }
    };

    fetchToken();

    // Carregar favoritos do localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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
                {loading && <div className="spinner-container"><div className="spinner"></div></div>}
                {error && <p>{error}</p>}
                {!loading && playlists.length > 0 && (
                  <>
                    <Playlists
                      playlists={playlists}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                    />
                    <div className="pagination">
                      <button onClick={() => { handleSearch(query, page - 1); setPage(page - 1); }} disabled={page === 1}>
                        Last Page
                      </button>
                      <button onClick={() => { handleSearch(query, page + 1); setPage(page + 1); }}>
                        Next Page
                      </button>
                    </div>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/playlists"
            element={<Playlists playlists={playlists} favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/search"
            element={<SearchBar onSearch={(query) => handleSearch(query)} />}
          />
          {/* Nova rota para favoritos */}
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;