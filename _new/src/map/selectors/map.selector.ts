import { IState } from '../reducers/map.reducer';
import { DemoData, DataFilter } from '../../assets/data/dataType';

export const getLoadingStatus = (state: IState): boolean => {
  return state.laoding;
};

export const getContent = (state: IState): Array<DemoData> => {
  return state.filtertContent.length ? state.filtertContent : state.content;
};

export const getFilter = (state: IState): DataFilter => {
  return state.filter;
};

export const getDetailService = (state: IState): DemoData => {
  return state.detailedService;
};

export const getContentByProvider = (
  state: IState,
  provider: string
): Array<DemoData> => {
  return state.content.filter(service => service.provider === provider);
};
