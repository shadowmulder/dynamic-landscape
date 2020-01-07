import { IState } from '../reducers/map.reducer';
import { DemoData, DataFilter } from '../../assets/data/dataType';

export const getLoadingStatus = (state: IState): boolean => {
  return state.laoding;
};

export const getContent = (state: IState): Array<DemoData> => {
  return Object.keys(state.filter).some(
    key => state.filter[key as keyof typeof state.filter].length > 0
  )
    ? state.filtertContent
    : state.content;
};

export const getFilter = (state: IState): DataFilter => {
  return state.filter;
};

export const getPossibleFilterValues = (state: IState): DataFilter => {
  return state.toFilterValues;
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
