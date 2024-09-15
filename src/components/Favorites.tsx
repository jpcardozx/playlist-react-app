import React from 'react';
import { Playlist } from '../api/spotify';
import PlaylistCard from './PlaylistCard';
import '../styles/Favorites.css';

interface FavoritesProps {
  favorites: Playlist[];
  toggleFavorite: (playlist: Playlist) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return <p>Você ainda não adicionou nenhuma playlist aos favoritos.</p>;
  }

  return (
    <div className="favorites-grid">
      {favorites.map((playlist) => (
        <PlaylistCard
          key={playlist.id} // Importante: cada filho precisa ter uma chave única
          playlist={playlist}
          isFavorite={true} // As playlists exibidas aqui são sempre favoritas
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default Favorites;