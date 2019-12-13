import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import NavigationComponent from './navigation.component';




interface IProps {}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
