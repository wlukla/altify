class ApiService {
  async fetchWithAuthorization(
    url: string,
    init?: RequestInit
  ): Promise<Record<string, unknown> | void> {
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

  async getLikedSongs(
    offset = 0,
    limit = 50
  ): Promise<Record<string, unknown> | void> {
    const url = `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`;
    const data = await this.fetchWithAuthorization(url);

    return data;
  }

  async getUserAlbums(): Promise<Record<string, unknown> | void> {
    const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=20';
    const data = await this.fetchWithAuthorization(url);

    return data;
  }
}

const service = new ApiService();

export default service;
