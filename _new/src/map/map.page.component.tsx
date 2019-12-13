import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { IState } from '../reducers';
import { getLoadingStatus } from './selectors/map.selector';
import { loadingDone } from './actions/map.actions';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Loading } from './components/laoding/loading.container.component';
import { Grid } from '@material-ui/core';

interface IProps {
  laoding: boolean;
  loadingDone: () => void;

}

class MapComponant extends React.Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }

  public render() {
    return (
     <Grid>
        {this.props.laoding?<Loading/>:<GitHubIcon/>}
      </Grid>
       
    );
  }
}

const mapStateToProps = (state: IState) => ({
  laoding: getLoadingStatus(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadingDone: () => dispatch(loadingDone(true))
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponant);
