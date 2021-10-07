import { connect } from 'react-redux'
import SelectInput from './SelectInput';
import { getParamValueByIds, changeParamValue } from '../../../redux/orderingRedux';

const mapStateToProps = (state, {productId, id}) => ({
  selected: getParamValueByIds(state, productId, id),
});

const mapDispatchToProps = (dispatch, {productId, id}) => ({
  changeSelected: (value) => dispatch(changeParamValue(value, productId, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput);