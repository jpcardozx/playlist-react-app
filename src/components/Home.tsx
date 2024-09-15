import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Playlists from './Playlists';
import { getToken, searchPlaylists, Playlist } from '../api/spotify';

const Home: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Playlist[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    setLoading(true);
    setError(null);

    const results = await searchPlaylists(searchQuery, token);
    setPlaylists(results);
    setLoading(false);
  };

  const toggleFavorite = (playlist: Playlist) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === playlist.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== playlist.id);
    } else {
      updatedFavorites = [...favorites, playlist];
    }
    setFavorites(updatedFavorites);
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
  }, []);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Playlists playlists={playlists} favorites={favorites} toggleFavorite={toggleFavorite} />
    </>
  );
};

export default Home;
