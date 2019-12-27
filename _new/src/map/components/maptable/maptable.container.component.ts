import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import MapTableComponent from './maptable.component';
import { getContent } from '../../selectors/map.selector';
import { IState } from '../../../reducers';
import { DemoData } from '../../../assets/data/dataType';
import { setDetailService } from '../../actions/map.actions';

interface IProps {
  content: Array<DemoData>;
  setDetailService: (service: DemoData) => void;
}

const mapStateToProps = (state: IState) => ({
  content: getContent(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDetailService: (service: DemoData) => dispatch(setDetailService(service))
});

export const MapTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapTableComponent);
