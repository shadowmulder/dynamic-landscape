import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DetailModalContainer from './detailModal.component';
import { DemoData } from '../../../assets/data/dataType';

interface IProps {
  service: DemoData;
  deleteDetailService: () => void;
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const DetailModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailModalContainer);
