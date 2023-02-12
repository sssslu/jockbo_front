import { atom } from 'recoil';

export const searchState = atom<boolean>({
  key: 'searchState',
  default: false,
});
