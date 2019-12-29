import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FilterComponentContainer from './filter.component';
import { setFilter } from '../../../map/actions/map.actions';
import { getFilter } from '../../../map/selectors/map.selector';
import { IState } from '../../../reducers/index';
import { DataFilter } from '../../../assets/data/dataType';

interface IProps {
  filter: DataFilter;
  iconClassName: any;
  setFilter: (filter: DataFilter) => void;
  displayChips?: Boolean;
}
const mapStateToProps = (state: IState) => ({
  filter: getFilter(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (filter: DataFilter) => dispatch(setFilter(filter))
});

export const FilterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponentContainer);
