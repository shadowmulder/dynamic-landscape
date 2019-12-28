import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FilterComponentContainer from './filter.component';
import { setFilter } from './../../actions/map.actions';
import { getFilter } from './../../selectors/map.selector';
import { IState } from './../../../reducers/index';
import { DataFilter, DemoData } from '../../../assets/data/dataType';

interface IProps {
  filter: DataFilter;
  iconClassName: any;
  services: DemoData[];
  setFilter: (services: DemoData[], Filter: DataFilter) => void;
}
const mapStateToProps = (state: IState) => ({
  filter: getFilter(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (services: DemoData[], filter: DataFilter) =>
    dispatch(setFilter(services, filter))
});

export const FilterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponentContainer);
