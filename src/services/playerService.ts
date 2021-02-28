class PlayerService {
  player?: Spotify.SpotifyPlayer;

  constructor() {
    this.waitForSpotify();
  }

  waitForSpotify(): Promise<void> {
    return new Promise((resolve) => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = resolve;
      }
    });
  }

  async createPlayer(access_token: string) {
    await this.waitForSpotify();

    const { Player } = window.Spotify;

    this.player = new Player({
      name: 'Altify player',
      getOAuthToken(cb: (token: string) => void) {
        cb(access_token);
      },
    });

    this.player.connect();
  }

  play(uri: string) {
    if (this.player) {
      const { id, getOAuthToken } = this.player._options;

      getOAuthToken((token) => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [uri] }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      });
    }
  }
}

const playerService = new PlayerService();

export default playerService;
