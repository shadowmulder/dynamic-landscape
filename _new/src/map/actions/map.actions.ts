export const LOADINGDONE =  'LOADINGDONE';

interface LoadingDoneAction {
  type: typeof  LOADINGDONE
  payload: boolean;
}

export function loadingDone(value: boolean): MapActionTypes {
  return {
    type: LOADINGDONE,
    payload: value
  };
}

export type MapActionTypes = LoadingDoneAction; //|| ...;
