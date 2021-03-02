class PlayerService {
  player?: Spotify.SpotifyPlayer;
  stateRefreshInterval?: NodeJS.Timeout;

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

  destroyPlayer() {
    this.player?.disconnect();
  }

  play(uri: string) {
    if (this.player) {
      const { id, getOAuthToken } = this.player._options;

      getOAuthToken(async (token) => {
        await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
          {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.player?.resume();
      });
    }
  }

  toggle() {
    this.player?.togglePlay();
  }

  addPlayerStateListener(cb: (state: Spotify.PlaybackState) => void) {
    this.player?.on('player_state_changed', async (state) => cb(state));
  }

  startStateRefresh(callback: (state: Spotify.PlaybackState) => void) {
    if (this.stateRefreshInterval) {
      clearInterval(this.stateRefreshInterval);
    }

    this.stateRefreshInterval = setInterval(async () => {
      const state = await this.player?.getCurrentState();
      if (state) {
        callback(state);
      }
    }, 1000);
  }

  stopStateRefresh() {
    if (this.stateRefreshInterval) {
      clearInterval(this.stateRefreshInterval);
    }
  }
}

const playerService = new PlayerService();

export default playerService;
