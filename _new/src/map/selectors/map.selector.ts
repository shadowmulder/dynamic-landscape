import { IState } from '../reducers/map.reducer';

export const getLoadingStatus = (state: IState): boolean => {
  return state.laoding;
};
