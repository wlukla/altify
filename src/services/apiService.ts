import getRandomChar from '../utils/getRandomChar';
import { SongsResponse, Item, RandomSongResponse, Track } from './types';

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

      try {
        const data = await response.json();

        return data;
      } catch (e) {
        console.log("Response doesn't have body");
      }
    }
  }

  async getLikedSongs(offset = 0, limit = 50): Promise<Item[] | void> {
    const url = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;
    const data = await this.fetchWithAuthorization<SongsResponse>(url);

    if (data) {
      return data.items;
    }
  }

  async getRandomTrack(): Promise<Track | void> {
    const params = new URLSearchParams({
      offset: Math.floor(Math.random() * 1000).toString(),
      q: `${getRandomChar()}%`,
      type: 'track',
      limit: '1',
    });

    const url = `https://api.spotify.com/v1/search?${params}`;

    const data = await this.fetchWithAuthorization<RandomSongResponse>(url);

    if (data) {
      return data.tracks.items[0];
    }
  }

  likeSong(id: string) {
    const params = new URLSearchParams({ ids: id });
    const url = `https://api.spotify.com/v1/me/tracks?${params}`;

    return this.fetchWithAuthorization(url, { method: 'PUT' });
  }
}

const service = new ApiService();

export default service;
