import { connect } from 'react-redux';
import ReservationSubmitButton from './ReservationSubmitButton';
import { 
  getDate,
  getHour,
  getTable,
  getRepeat,
  getDuration,
  getPeople,
  getBreadStarter,
  getLemonWaterStarter,
  handleDataChangeInAPI,
  getHandleDataChangeState,
} from '../../../redux/reservationRedux';
import { getEventRepeatById } from '../../../redux/eventsRedux';

const mapStateToProps = (state, { id }) => ({
  date: getDate(state),
  hour: getHour(state),
  table: getTable(state),
  repeat: getRepeat(state),
  duration: getDuration(state),
  ppl: getPeople(state),
  breadStarter: getBreadStarter(state),
  lemonWaterStarter: getLemonWaterStarter(state),
  initialRepeat: getEventRepeatById(state, id),
  handleDataChangeState: getHandleDataChangeState(state),
});

const mapDispatchToProps = (dispatch, { type, id }) => ({
  handleDataChange: (changedData, initialRepeat) => dispatch(handleDataChangeInAPI(type, id, changedData, initialRepeat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationSubmitButton);