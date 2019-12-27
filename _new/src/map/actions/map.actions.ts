import { DemoData } from '../../assets/data/dataType';

export const SETCONTENT = 'SETCONTENT';
export const SETDETAILSERVICE = 'SETDETAILSERVICE';

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

export type MapActionTypes = SetContentAction | SetDetailService; //|| ...
