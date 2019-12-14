import { DemoData } from '../../assets/data/dataType';

export const LOADINGDONE = 'LOADINGDONE';
export const SETCONTENT = 'SETCONTENT';

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

export type MapActionTypes = LoadingDoneAction | SetContentAction; //|| ...
