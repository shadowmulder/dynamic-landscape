import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FilterComponentContainer from './filter.component';
import { setFilter } from './../../actions/map.actions';
import { getFilter } from './../../selectors/map.selector';
import { IState } from './../../../reducers/index';
import { DataFilter } from '../../../assets/data/dataType';

interface IProps {
  filter: DataFilter;
  iconClassName: any;
  setFilter: (Filter: DataFilter) => void;
}
const mapStateToProps = (state: IState) => ({
  filter: getFilter(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (Filter: DataFilter) => dispatch(setFilter(Filter))
});

export const FilterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponentContainer);
