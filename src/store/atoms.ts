import { atom } from 'recoil';
import { Item } from '../services/types';

export const signInState = atom({
  key: 'signInState',
  default: false,
});

export const songsListState = atom<Item[]>({
  key: 'songsListState',
  default: [],
});

export const playbackState = atom<Spotify.PlaybackState | null>({
  key: 'playbackState',
  default: null,
});
