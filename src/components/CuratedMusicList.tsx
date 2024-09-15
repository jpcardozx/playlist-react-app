import React from 'react';
import '../styles/CuratedMusicList.css';

const CuratedMusicList: React.FC = () => {
  // IDs das faixas de cada seleção
  const myTracks = [
    '3n3Ppam7vgaVa1iaRUc9Lp',
    '0eGsygTp906u18L0Oimnem',
    '7ouMYWpwJ422jRcDASZB7P',
    '2TpxZ7JUBn3uw46aR7qd6V',
    '5VnDkUNzFvpmRtNZuSbpCQ',
    '3twNvmDtFQtAd5gMKedhLD',
    '4VqPOruhp5EdPBeR92t6lQ',
    '1rfofaqEpACxVEHIZBJe6W',
    '2BgEsaKNfHUdlh97KmvFyo',
    '6g0Orsxv6glTJCt4cHsRsQ',
    '4VqPOruhp5EdPBeR92t6lQ',
    '1rfofaqEpACxVEHIZBJe6W',
    '2BgEsaKNfHUdlh97KmvFyo',
    '6g0Orsxv6glTJCt4cHsRsQ',
    '0eGsygTp906u18L0Oimnem',
  ];

  const boyfriendTracks = [
    '3n3Ppam7vgaVa1iaRUc9Lp',
    '0eGsygTp906u18L0Oimnem',
    '7ouMYWpwJ422jRcDASZB7P',
    '2TpxZ7JUBn3uw46aR7qd6V',
    '5VnDkUNzFvpmRtNZuSbpCQ',
    '3twNvmDtFQtAd5gMKedhLD',
    '4VqPOruhp5EdPBeR92t6lQ',
    '1rfofaqEpACxVEHIZBJe6W',
    '2BgEsaKNfHUdlh97KmvFyo',
    '6g0Orsxv6glTJCt4cHsRsQ',
    '4VqPOruhp5EdPBeR92t6lQ',
    '1rfofaqEpACxVEHIZBJe6W',
    '2BgEsaKNfHUdlh97KmvFyo',
    '6g0Orsxv6glTJCt4cHsRsQ',
    '0eGsygTp906u18L0Oimnem',
  ];

  return (
    <div className="curated-music-list">
      {/* Container Esquerdo (Suas Informações e Faixas) */}
      <div className="curation-box my-container">
        <div className="curator-info">
          <img src="link-da-sua-foto" alt="Sua Foto" className="curator-photo" />
          <div className="curator-details">
            <h3>João Pedro</h3>
            <p>Aqui uma breve descrição sobre você e seu gosto musical.</p>
          </div>
        </div>
        <div className="track-list">
          {myTracks.map((id) => (
            <iframe
              key={id}
              src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          ))}
        </div>
      </div>

      {/* Container Direito (Informações do Namorado e Faixas) */}
      <div className="curation-box boyfriend-container">
        <div className="curator-info">
          <img src="link-da-foto-do-namorado" alt="Foto Namorado" className="curator-photo" />
          <div className="curator-details">
            <h3>Nome do Namorado</h3>
            <p>Aqui uma breve descrição sobre o gosto musical do seu namorado.</p>
          </div>
        </div>
        <div className="track-list">
          {boyfriendTracks.map((id) => (
            <iframe
              key={id}
              src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuratedMusicList;