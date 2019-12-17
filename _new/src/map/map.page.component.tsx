import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { IState } from '../reducers';
import {
  getLoadingStatus,
  getContent,
  getDetailService
} from './selectors/map.selector';
import {
  loadingDone,
  setContent,
  setDetailService,
  deleteDetailService
} from './actions/map.actions';
import { Loading } from './components/laoding/loading.container.component';
import { Grid } from '@material-ui/core';
import { MapTable } from './components/maptable/maptable.container.component';
import { DemoData } from '../assets/data/dataType';

//import Test Data
import testdate from '../assets/data/data.json';
import { DetailModal } from './components/detailModal/detailModal.container.component';

interface IProps {
  laoding: boolean;
  content: Array<DemoData>;
  detailService: DemoData;
  loadingDone: () => void;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteDetailService: () => void;
}

class MapComponant extends React.Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }

  componentDidMount() {
    this.props.setContent(testdate);
    setTimeout(() => this.props.loadingDone(), 1000);
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
        {Object.keys(this.props.detailService).length !== 0 && (
          <DetailModal
            service={this.props.detailService}
            deleteDetailService={this.props.deleteDetailService}
          />
        )}
        {this.props.laoding ? <Loading /> : <MapTable />}
      </Grid>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  laoding: getLoadingStatus(state.Map),
  content: getContent(state.Map),
  detailService: getDetailService(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadingDone: () => dispatch(loadingDone(true)),
  setContent: (content: Array<DemoData>) => dispatch(setContent(content)),
  setDetailService: (service: DemoData) => dispatch(setDetailService(service)),
  deleteDetailService: () => dispatch(deleteDetailService())
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponant);
