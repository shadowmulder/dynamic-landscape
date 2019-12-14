import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { IState } from '../reducers';
import { getLoadingStatus, getContent } from './selectors/map.selector';
import { loadingDone, setContent } from './actions/map.actions';
import { Loading } from './components/laoding/loading.container.component';
import { Grid } from '@material-ui/core';
import { MapTable } from './components/maptable/maptable.container.component';
import { DemoData } from '../assets/data/dataType';

//import Test Data
import testdate from '../assets/data/data.json';

interface IProps {
  laoding: boolean;
  content: Array<DemoData>;
  loadingDone: () => void;
  setContent: (object: Array<DemoData>) => void;
}

class MapComponant extends React.Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }

  componentDidMount() {
    this.props.setContent(testdate);
    setTimeout(() => this.props.loadingDone(), 3000);
  }

  public render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ minHeight: 600, marginTop: 40 }}
      >
        {this.props.laoding ? <Loading /> : <MapTable />}
      </Grid>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  laoding: getLoadingStatus(state.Map),
  content: getContent(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadingDone: () => dispatch(loadingDone(true)),
  setContent: (content: Array<DemoData>) => dispatch(setContent(content))
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponant);
