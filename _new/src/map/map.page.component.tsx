import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Dispatch } from 'redux';
import { IState } from '../reducers';
import {
  getLoadingStatus,
  getContent,
  getDetailService
} from './selectors/map.selector';
import {
  setContent,
  setDetailService,
  deleteDetailService
} from './actions/map.actions';
import { Loading } from './components/laoding/loading.container.component';
import { Grid } from '@material-ui/core';
import { MapTable } from './components/maptable/maptable.container.component';
import { DemoData } from '../assets/data/dataType';
import { DetailModal } from './components/detailModal/detailModal.container.component';

//URL to fetch data
const dataUrl: string =
  process.env.NODE_ENV !== 'production'
    ? `http://localhost:1111/`
    : (process.env.dataUrl as string);

interface IProps {
  laoding: boolean;
  content: Array<DemoData>;
  detailService: DemoData;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteDetailService: () => void;
}

class MapComponant extends React.Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }

  private fetchData() {
    axios.get(dataUrl).then(res => {
      this.props.setContent(res.data);
    });
  }

  componentDidMount() {
    this.fetchData();
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
  setContent: (content: Array<DemoData>) => dispatch(setContent(content)),
  setDetailService: (service: DemoData) => dispatch(setDetailService(service)),
  deleteDetailService: () => dispatch(deleteDetailService())
});

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponant);
