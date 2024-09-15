import React from 'react';
import SearchBar from './SearchBar';
import Playlists from './Playlists';

interface HomeProps {
  playlists: any[]; // Coloque aqui a tipagem correta de 'Playlist', se disponível
  query: string;
  handleSearch: (query: string) => void;
  loading: boolean;
  error: string | null;
  favorites: any[]; // Coloque a tipagem correta
  toggleFavorite: (playlist: any) => void;
}

const Home: React.FC<HomeProps> = ({ playlists, query, handleSearch, loading, error, favorites, toggleFavorite }) => {
  return (
    <>
      <SearchBar onSearch={(query) => handleSearch(query)} />
      {loading && <div className="spinner-container"><div className="spinner"></div></div>}
      {error && <p>{error}</p>}
      {!loading && playlists.length > 0 && (
        <Playlists playlists={playlists} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </>
  );
};

export default Home;