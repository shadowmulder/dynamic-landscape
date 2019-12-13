import { IAction } from '../../shared/action';
import update from 'immutability-helper';
import { LOADINGDONE } from '../actions/map.actions';

export interface IState {
  laoding: boolean;
}

const initialState: IState = {
  laoding: true
};

export const Map = (state: IState = initialState, action: IAction<void>) => {
  switch (action.type) {
    case LOADINGDONE:
      return update(state, {
        laoding: { $set: false }
      });

    default:
      return state;
  }
};
