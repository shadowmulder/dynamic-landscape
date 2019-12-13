import { combineReducers } from 'redux';
import { Map, IState as MapState } from '../map/reducers/map.reducer';

//to put router state in redux state
//import { RouterState } from 'connected-react-router';

export const rootReducer = combineReducers({
  Map
});

// this is the global state
export interface IState {
  Map: MapState;
}
