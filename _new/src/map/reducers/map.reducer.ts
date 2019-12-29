import { IAction } from '../../shared/action';
import update from 'immutability-helper';
import {
  SETCONTENT,
  SETDETAILSERVICE,
  SETFILTER
} from '../actions/map.actions';
import { DemoData, DataFilter } from '../../assets/data/dataType';
import serviceFilter from './filterLogic';

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
    provider: [],
    category: ['Security']
  },
  filtertContent: []
};

export const Map = (state: IState = initialState, action: IAction<any>) => {
  switch (action.type) {
    case SETCONTENT:
      return update(state, {
        content: { $set: action.payload },
        filtertContent: {
          $set: serviceFilter(action.payload, state.filter)
        },
        laoding: { $set: false }
      });

    case SETDETAILSERVICE:
      return update(state, {
        detailedService: { $set: action.payload }
      });

    case SETFILTER:
      return update(state, {
        filtertContent: {
          $set: serviceFilter(state.content, action.payload)
        },
        filter: { $set: action.payload }
      });

    default:
      return state;
  }
};
