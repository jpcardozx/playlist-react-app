import React, { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="overlay"></div>
      <h1>Discover Playlists</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for playlists or music..."
        />
        <button onClick={handleSearch} disabled={!query.trim()}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;