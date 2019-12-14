import { IState } from '../reducers/map.reducer';
import { DemoData } from '../../assets/data/dataType';

export const getLoadingStatus = (state: IState): boolean => {
  return state.laoding;
};

export const getContent = (state: IState): Array<DemoData> => {
  return state.content;
};

export const getContentByProvider = (
  state: IState,
  provider: string
): Array<DemoData> => {
  return state.content.filter(service => service.provider === provider);
};
