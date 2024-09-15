import React from 'react';
import { Playlist } from '../api/spotify';
import '../styles/PlaylistCard.css';

interface PlaylistCardProps {
  playlist: Playlist;
  isFavorite: boolean;
  toggleFavorite: (playlist: Playlist) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, isFavorite, toggleFavorite }) => {
  return (
    <div className="playlist-card">
      <img src={playlist.images[0]?.url} alt={playlist.name} />
      <div className="playlist-info">
        <h3>{playlist.name}</h3>
        <p>{playlist.description}</p>
        <div className="button-group">
          <button onClick={() => toggleFavorite(playlist)}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <a 
            href={playlist.external_urls.spotify} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="spotify-button"
          >
            Open in Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
