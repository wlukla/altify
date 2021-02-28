import { createRandomString, sha256, toBase64 } from '../utils';

class SpotifyService {
  clientId: string;

  constructor(clientId?: string) {
    if (!clientId) {
      throw new Error('CLIENT_ID env varibale is missing!');
    }

    console.log(clientId);
    this.clientId = clientId;
  }

  private async createArgsForPKCE(): Promise<{
    codeVerifier: string;
    codeChallenge: string;
  }> {
    const codeVerifier = createRandomString(96);
    const hashHex = await sha256(codeVerifier);
    const codeChallenge = toBase64(hashHex);

    return {
      codeVerifier,
      codeChallenge,
    };
  }

  async startAuth(): Promise<void> {
    const {
      codeVerifier,
      codeChallenge: code_challenge,
    } = await this.createArgsForPKCE();

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: `${window.location.origin}/login`,
      code_challenge_method: 'S256',
      code_challenge,
      scope: 'user-library-read',
    });

    sessionStorage.setItem('code_verifier', codeVerifier);

    const url = `https://accounts.spotify.com/authorize?${params}`;

    window.open(url, '_self');
  }

  async getToken(): Promise<void> {
    const queryParams = new URLSearchParams(location.search);

    const params = new URLSearchParams({
      client_id: this.clientId,
      grant_type: 'authorization_code',
      redirect_uri: `${window.location.origin}/login`,
    });

    const code = queryParams.get('code');
    const codeVerifier = sessionStorage.getItem('code_verifier');

    if (code && codeVerifier) {
      params.append('code', code);
      params.append('code_verifier', codeVerifier);

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
      });

      const data = await response.json();

      localStorage.setItem(
        'tokenData',
        JSON.stringify({
          ...data,
          expiresAt: parseInt(data.expires_in) * 1000 + Date.now(),
        })
      );
    }
  }

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

  async getLikedSongs(): Promise<Record<string, unknown> | void> {
    const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=20';

    const data = await this.fetchWithAuthorization(url);

    console.log(data);

    return data;
  }
}

const service = new SpotifyService(process.env.CLIENT_ID);

export default service;
