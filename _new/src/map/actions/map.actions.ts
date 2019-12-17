import { DemoData } from '../../assets/data/dataType';

export const LOADINGDONE = 'LOADINGDONE';
export const SETCONTENT = 'SETCONTENT';
export const SETDETAILSERVICE = 'SETDETAILSERVICE';

interface LoadingDoneAction {
  type: typeof LOADINGDONE;
  payload: boolean;
}

export function loadingDone(value: boolean): MapActionTypes {
  return {
    type: LOADINGDONE,
    payload: value
  };
}

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
    payload: {}
  };
}

export type MapActionTypes =
  | LoadingDoneAction
  | SetContentAction
  | SetDetailService; //|| ...
