import { DemoData, DataFilter } from '../../assets/data/dataType';

export const SETCONTENT = 'SETCONTENT';
export const SETDETAILSERVICE = 'SETDETAILSERVICE';
export const SETFILTER = 'SETFILTER';

interface SetContentAction {
  type: typeof SETCONTENT;
  payload: Array<DemoData>;
}

export function setContent(value: Array<DemoData>): MapActionTypes {
  return {
    type: SETCONTENT,
    payload: value
  };
}

interface SetFilterAction {
  type: typeof SETFILTER;
  payload: DataFilter;
}

export function setFilter(filter: DataFilter): MapActionTypes {
  return {
    type: SETFILTER,
    payload: filter
  };
}

interface SetDetailService {
  type: typeof SETDETAILSERVICE;
  payload: DemoData;
}

export function setDetailService(value: DemoData): MapActionTypes {
  return {
    type: SETDETAILSERVICE,
    payload: value
  };
}

export function deleteDetailService(): MapActionTypes {
  return {
    type: SETDETAILSERVICE,
    payload: {} as DemoData
  };
}

export type MapActionTypes =
  | SetContentAction
  | SetDetailService
  | SetFilterAction; //|| ...
