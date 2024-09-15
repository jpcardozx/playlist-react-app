import React from 'react';
import { Playlist } from '../api/spotify'; // Importe o tipo de spotify.ts
import PlaylistCard from './PlaylistCard';
import '../styles/Playlists.css';

interface PlaylistsProps {
  playlists: Playlist[];
  favorites: Playlist[];
  toggleFavorite: (playlist: Playlist) => void;
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists, favorites, toggleFavorite }) => {
  return (
    <div className="playlists-grid">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          isFavorite={favorites.some(fav => fav.id === playlist.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default Playlists;