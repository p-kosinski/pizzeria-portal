import { connect } from 'react-redux';
import OrderSummary from './OrderSummary';
import {
  getOrderStatusById,
  getOrderTotalPriceById,
  getOrderTimeById,
  getOrderDataById,
  changeOrderStatusInAPI
} from '../../../redux/ordersRedux';

const mapStateToProps = (state, {id}) => ({
  status: getOrderStatusById(state, id),
  totalPrice: getOrderTotalPriceById(state, id),
  orderTime: getOrderTimeById(state, id),
  orderData: getOrderDataById(state, id),
});

const mapDispatchToProps = (dispatch, {id, index}) => ({
  changeOrderStatusInAPI: (status, orderData) => dispatch(changeOrderStatusInAPI(status, id, orderData, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);