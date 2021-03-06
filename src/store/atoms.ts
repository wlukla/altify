import { atom } from 'recoil';

export const authorizationState = atom({
  key: 'signInState',
  default: false,
});

export const songsListState = atom<SpotifyApi.UsersSavedTracksResponse | null>({
  key: 'songsListState',
  default: null,
});

export const playbackState = atom<Spotify.PlaybackState | null>({
  key: 'playbackState',
  default: null,
});

export const randomSongState = atom<SpotifyApi.TrackObjectFull | null>({
  key: 'randomSongState',
  default: null,
});
