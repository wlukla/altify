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

export const currentSongState = atom({
  key: 'currentSongState',
  default: {},
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
