import { LikedSongsResponse, Item } from './types';

class ApiService {
  async fetchWithAuthorization<T>(
    url: string,
    init?: RequestInit
  ): Promise<T | void> {
    const localStorageTokenData = localStorage.getItem('tokenData');

    if (localStorageTokenData) {
      const tokenData = JSON.parse(localStorageTokenData);

      const response = await fetch(url, {
        ...init,
        headers: {
          Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
        },
      });

      const data = await response.json();

      return data;
    }
  }

  async getLikedSongs(offset = 0, limit = 50): Promise<Item[] | void> {
    const url = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;
    const data = await this.fetchWithAuthorization<LikedSongsResponse>(url);

    if (data) {
      return data.items;
    }

    return;
  }
}

const service = new ApiService();

export default service;
