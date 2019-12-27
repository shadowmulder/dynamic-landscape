import { IAction } from '../../shared/action';
import update from 'immutability-helper';
import {
  SETCONTENT,
  SETDETAILSERVICE,
  SETFILTER
} from '../actions/map.actions';
import { DemoData, DataFilter } from '../../assets/data/dataType';

export interface IState {
  laoding: boolean;
  content: Array<DemoData>;
  detailedService: DemoData;
  filtertContent: Array<DemoData>;
  filter: DataFilter; //TODO - define
}

const initialState: IState = {
  laoding: true,
  content: [],
  detailedService: {} as DemoData,
  filter: {
    provider: []
  },
  filtertContent: []
};

export const Map = (state: IState = initialState, action: IAction<any>) => {
  switch (action.type) {
    case SETCONTENT:
      return update(state, {
        content: { $set: action.payload },
        laoding: { $set: false }
      });

    case SETDETAILSERVICE:
      return update(state, {
        detailedService: { $set: action.payload }
      });

    case SETFILTER:
      return update(state, {
        filtertContent: {
          $set: state.content.filter(s =>
            action.payload.provider.includes(s.provider)
          )
        },
        filter: { $set: action.payload }
      });

    default:
      return state;
  }
};
