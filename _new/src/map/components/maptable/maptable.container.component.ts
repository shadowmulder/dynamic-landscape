import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import MapTableComponent from './maptable.component';
import { getContent } from '../../selectors/map.selector';
import { IState } from '../../../reducers';
import { DemoData } from '../../../assets/data/dataType';

interface IProps {
  content: Array<DemoData>;
}

const mapStateToProps = (state: IState) => ({
  content: getContent(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const MapTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapTableComponent);
