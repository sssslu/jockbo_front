import { atom } from 'recoil';

export const searchLoadingState = atom<boolean>({
  key: 'searchState',
  default: false,
});

export const loopLoadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});

export const gyeBoIdState = atom<number>({
  key: 'userState',
  default: 100001,
});
