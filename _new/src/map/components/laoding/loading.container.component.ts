import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoadingComponent from './loading.component';





interface IProps {}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const Loading = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingComponent);
