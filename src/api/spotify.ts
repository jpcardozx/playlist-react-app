import axios from 'axios';

// Credenciais da API do Spotify (substitua com as suas)
const clientId = 'ff38e3f19e20405c8d3c4ff2f9958b7f';
const clientSecret = '1d89992524bd462db019c1b155010326';

// Interface para a resposta do token
interface TokenResponse {
  access_token: string;
}

// Função para obter o token de acesso OAuth 2.0 da API do Spotify
export const getToken = async (): Promise<string | null> => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
  };
  const data = 'grant_type=client_credentials';

  try {
    const response = await axios.post<TokenResponse>(tokenUrl, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter o token de acesso:', error);
    return null;
  }
};

// Interface para a estrutura da playlist retornada pela API
export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

// Interface para a resposta da API de playlists
interface PlaylistSearchResponse {
  playlists: {
    items: Playlist[];
  };
}

// Função para buscar playlists com base em uma query de pesquisa e uma página
export const searchPlaylists = async (
  query: string, 
  token: string, 
  page: number = 1 // Adicionando o parâmetro de página
): Promise<Playlist[]> => {
  const limit = 20; // Limite de playlists por página
  const offset = (page - 1) * limit; // Calculando o offset para paginação
  const searchUrl = `https://api.spotify.com/v1/search?type=playlist&q=${query}&limit=${limit}&offset=${offset}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get<PlaylistSearchResponse>(searchUrl, { headers });
    return response.data.playlists.items; // Retorna os itens das playlists
  } catch (error) {
    console.error('Erro ao buscar playlists:', error);
    return [];
  }
};