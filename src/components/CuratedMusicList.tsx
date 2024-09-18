import React from 'react';
import '../styles/CuratedMusicList.css';

const CuratedMusicList: React.FC = () => {
  // IDs de faixas LGBT e mais atuais
  const myTracks: string[] = [
    '41FfJDG3FRnChcwlLRBgMp',
    '2DuPBbS5mIldXnh7Wum8Cy?si', // Deixe vazio ou insira IDs válidos aqui
  ];

  // IDs de faixas emo e alternativas, incluindo Terno Rei
  const boyfriendTracks: string[] = [
    '1KyOzll4W0xZA2JJ9S9PWS?si',
    '6oby4VF2Jhf0XohwsxyZ90?si', // Deixe vazio ou insira IDs válidos aqui
  ];

  // Função para renderizar o iframe, verificando se o ID é válido
  const renderIframe = (id: string) => {
    // Verifica se o id está vazio ou inválido
    if (!id || id.trim() === '') {
      console.log("Iframe não renderizado, ID inválido:", id);
      return null; // Não renderiza o iframe se o ID for vazio
    }

    // Renderiza o iframe somente se o id for válido
    return (
      <iframe
        key={id}
        src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    );
  };

  return (
    <div className="curated-music-list">
      {/* Container Esquerdo (Suas Informações e Faixas) */}
      <div className="curation-box my-container">
        <div className="curator-info">
          <img
            src="https://github.com/jpcardozx/playlist-react-app/blob/main/src/assets/jp.png?raw=true"
            alt="Sua Foto"
            className="curator-photo"
          />
          <div className="curator-details">
            <h3>Pedro</h3>
            <p>Frontend Developer</p>
          </div>
        </div>
        <div className="track-list">
          {/* Renderiza apenas se houver ID de faixas */}
          {myTracks.length > 0 && myTracks.some((id) => id.trim()) ? (
            myTracks.map((id) => renderIframe(id))
          ) : (
            <p>No tracks available</p>
          )}
        </div>
      </div>

      {/* Container Direito (Informações do Namorado e Faixas) */}
      <div className="curation-box boyfriend-container">
        <div className="curator-info">
          <img
            src="https://github.com/jpcardozx/playlist-react-app/blob/main/src/assets/nathan.png?raw=true"
            alt="Foto Namorado"
            className="curator-photo"
          />
          <div className="curator-details">
            <h3>Nathan</h3>
            <p>Poker Player & Music Producer</p>
          </div>
        </div>
        <div className="track-list">
          {/* Renderiza apenas se houver ID de faixas */}
          {boyfriendTracks.length > 0 && boyfriendTracks.some((id) => id.trim()) ? (
            boyfriendTracks.map((id) => renderIframe(id))
          ) : (
            <p>No tracks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CuratedMusicList;
