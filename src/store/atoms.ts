import { atom } from 'recoil';

export const signInState = atom({
  key: 'signInState',
  default: false,
});

export const songsListState = atom({
  key: 'songsListState',
  default: [],
});
