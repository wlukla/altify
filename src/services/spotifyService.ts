import { createRandomString, sha256, toBase64 } from '../utils';

class SpotifyService {
  clientId: string;
  accessToken?: string;
  expiresIn?: string;
  refreshToken?: string;
  tokenType?: string;

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

      const { access_token, expires_in, refresh_token, token_type } = data;

      this.accessToken = access_token;
      this.expiresIn = expires_in;
      this.refreshToken = refresh_token;
      this.tokenType = token_type;
    }
  }
}

const service = new SpotifyService(process.env.CLIENT_ID);

export default service;
