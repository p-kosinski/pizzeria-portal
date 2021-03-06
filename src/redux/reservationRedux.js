import Axios from 'axios';
import { api } from '../settings';
import { DateTime, Interval } from 'luxon';

/* selectors */
export const getDate = ({reservation}) => reservation.date;
export const getHour = ({reservation}) => reservation.hour;
export const getTable = ({reservation}) => reservation.table;
export const getRepeat = ({reservation}) => reservation.repeat;
export const getDuration = ({reservation}) => reservation.duration;
export const getPeople = ({reservation}) => reservation.ppl;
export const getBreadStarter = ({reservation}) => reservation.starters.bread;
export const getLemonWaterStarter = ({reservation}) => reservation.starters.lemonWater;

export const getHandleDataChangeState = ({reservation}) => reservation.handleDataChange.state;

export const getShowPeriods = ({reservation}) => reservation.handleDataChange.showPeriods;
export const getAvailablePeriods = ({reservation}) => reservation.handleDataChange.availablePeriods;

export const getAlertSuccess = ({reservation}) => reservation.saveDataChanges.alertSuccess;

/* action name creator */
const reducerName = 'reservation';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const CHANGE_DATE = createActionName('CHANGE_DATE');
const CHANGE_HOUR = createActionName('CHANGE_HOUR');
const CHANGE_TABLE = createActionName('CHANGE_TABLE');
const CHANGE_REPEAT = createActionName('CHANGE_REPEAT');
const CHANGE_DURATION = createActionName('CHANGE_DURATION');
const CHANGE_PEOPLE = createActionName('CHANGE_PEOPLE');
const CHANGE_BREAD_STARTER = createActionName('CHANGE_BREAD_STARTER');
const CHANGE_LEMON_WATER_STARTER = createActionName('CHANGE_LEMON_WATER_STARTER');

const HANDLE_DATA_CHANGE_START = createActionName('HANDLE_DATA_CHANGE_START');
const HANDLE_DATA_CHANGE_SUCCESS = createActionName('HANDLE_DATA_CHANGE_SUCCESS');
const HANDLE_DATA_CHANGE_ERROR = createActionName('HANDLE_DATA_CHANGE_ERROR');

const SET_SHOW_PERIODS = createActionName('SET_SHOW_PERIODS');

const FETCH_TABLE_RESERVATIONS_START = createActionName('FETCH_TABLE_RESERVATIONS_START');
const FETCH_TABLE_RESERVATIONS_SUCCESS = createActionName('FETCH_TABLE_RESERVATIONS_SUCCESS');
const FETCH_TABLE_RESERVATIONS_ERROR = createActionName('FETCH_TABLE_RESERVATIONS_ERROR');

const SAVE_DATA_CHANGES_START = createActionName('SAVE_DATA_CHANGES_START');
const SAVE_DATA_CHANGES_SUCCESS = createActionName('SAVE_DATA_CHANGES_SUCCESS');
const SAVE_DATA_CHANGES_ERROR = createActionName('SAVE_DATA_CHANGES_ERROR');

const SET_ALERT_SUCCESS = createActionName('SET_ALERT_SUCCESS');

/* action creators */
export const changeDate = payload => ({ payload, type: CHANGE_DATE });
export const changeHour = payload => ({ payload, type: CHANGE_HOUR });
export const changeTable = payload => ({ payload, type: CHANGE_TABLE });
export const changeRepeat = payload => ({ payload, type: CHANGE_REPEAT });
export const changeDuration = payload => ({ payload, type: CHANGE_DURATION });
export const changePeople = payload => ({ payload, type: CHANGE_PEOPLE });
export const changeBreadStarter = payload => ({ payload, type: CHANGE_BREAD_STARTER });
export const changeLemonWaterStarter = payload => ({ payload, type: CHANGE_LEMON_WATER_STARTER });

export const handleDataChangeStarted = payload => ({ payload, type: HANDLE_DATA_CHANGE_START });
export const handleDataChangeSuccess = payload => ({ payload, type: HANDLE_DATA_CHANGE_SUCCESS });
export const handleDataChangeError = payload => ({ payload, type: HANDLE_DATA_CHANGE_ERROR });

export const setShowPeriods = payload => ({ payload, type: SET_SHOW_PERIODS });

export const fetchTableReservationsStarted = payload => ({ payload, type: FETCH_TABLE_RESERVATIONS_START });
export const fetchTableReservationsSuccess = payload => ({ payload, type: FETCH_TABLE_RESERVATIONS_SUCCESS });
export const fetchTableReservationsError = payload => ({ payload, type: FETCH_TABLE_RESERVATIONS_ERROR });

export const saveDataChangesStarted = payload => ({ payload, type: SAVE_DATA_CHANGES_START });
export const saveDataChangesSuccess = payload => ({ payload, type: SAVE_DATA_CHANGES_SUCCESS });
export const saveDataChangesError = payload => ({ payload, type: SAVE_DATA_CHANGES_ERROR });

export const setAlertSuccess = payload => ({ payload, type: SET_ALERT_SUCCESS });

/* thunk creators */
export const handleDataChangeInAPI = (type, id, changedData, initialRepeat) => {
  return (dispatch, getState) => {
    dispatch(handleDataChangeStarted());
    dispatch(fetchTableReservationsStarted());

    const tableMatchParam = `${api.tableEqualParamKey}${changedData.table}`
    const dateMatchParam = `${api.dateEqualParamKey}${changedData.date}`;
    const excludeIdParam = `&${api.idNotEqualParamKey}${id}`;
    const today = DateTime.now().toISODate();

    let eventsRepeatIdParam = '';
    let eventsCurrentIdParam = '';
    let bookingsIdParam = '';

    if(changedData.date === today) {
      if(type === 'event') {
        initialRepeat === 'daily' ? eventsRepeatIdParam = excludeIdParam
                                  : eventsCurrentIdParam = excludeIdParam
      } else if(type === 'booking') {
        bookingsIdParam = excludeIdParam;
      }
    } else if(type === 'event' && initialRepeat === 'daily') {
      eventsRepeatIdParam = excludeIdParam;
    }

    const urls = [
      `${api.url}/api/${api.events}?${tableMatchParam}&${api.repeatParam}${eventsRepeatIdParam}`,
      `${api.url}/api/${api.events}?${tableMatchParam}&${api.notRepeatParam}&${dateMatchParam}${eventsCurrentIdParam}`,
      `${api.url}/api/${api.bookings}?${tableMatchParam}&${dateMatchParam}${bookingsIdParam}`
    ];

    Promise.all(urls.map((url) => Axios.get(url)))
      .then(([{data: eventsRepeat}, {data: eventsCurrent}, {data: bookings}]) => {
        const dataArray = [...eventsRepeat, ...eventsCurrent, ...bookings];

        dispatch(fetchTableReservationsSuccess(dataArray));
      })
      .then(() => {
        const checkTableAvailability = () => {
          const hourToNumber = (hourString) => {
            const parts = hourString.split(':');
          
            return parseInt(parts[0]) + parseInt(parts[1])/60;
          };

          const openHour = 12;
          const closeHour = 24;
          
          const tableBooked = {};

          for(let hourBlock = openHour; hourBlock < closeHour; hourBlock += 0.5) {
            tableBooked[hourBlock] = false;
          }

          const tableReservations = getState().reservation.tableReservations.data;

          for(let reservation of tableReservations) {
            const reservationStart = hourToNumber(reservation.hour);

            for(let hourBlock = reservationStart; hourBlock < reservationStart + reservation.duration; hourBlock += 0.5) {
              tableBooked[hourBlock] = true;
            }
          }

          const selectedHour = hourToNumber(changedData.hour);
          let tableIsAvailable = true;

          for(let hourBlock = selectedHour; hourBlock < selectedHour + changedData.duration; hourBlock += 0.5) {
            if(tableBooked[hourBlock] === false){
              continue;
            } else if(tableBooked[hourBlock] === true) {
              tableIsAvailable = false;
              break;
            }
          }

          return tableIsAvailable;
        };
        
        const tableIsAvailable = checkTableAvailability();

        if(!tableIsAvailable) {
          const calculateAvailablePeriods = () => {
            const openTime = DateTime.fromISO(changedData.date).set({hour: 12});
            const closeTime = DateTime.fromISO(changedData.date).set({hour: 24});
            const workingDayInterval = Interval.fromDateTimes(openTime, closeTime);
            const tableReservations = getState().reservation.tableReservations.data;

            const tableReservationIntervals = [];

            for(let reservation of tableReservations) {
              const hourParts = reservation.hour.split(':');
              const reservationTime = {
                hour: parseInt(hourParts[0]),
                minute: parseInt(hourParts[1]),
              };
              const durationObject = {hour: reservation.duration};

              const reservationStart = DateTime.fromISO(changedData.date).set(reservationTime);
              const reservationInterval = Interval.after(reservationStart, durationObject);

              tableReservationIntervals.push(reservationInterval);
            }

            const intervalsDifference = workingDayInterval.difference(...tableReservationIntervals);
            const tableAvailabilityIntervals = intervalsDifference.filter((interval) => interval.length('hours') >= 1);

            const availablePeriods = [];

            for(let interval of tableAvailabilityIntervals) {
              const intervalStart = interval.start.toLocaleString(DateTime.TIME_24_SIMPLE);
              const intervalEnd = interval.end.toLocaleString(DateTime.TIME_24_SIMPLE);

              const availablePeriod = `${intervalStart} - ${intervalEnd}`

              availablePeriods.push(availablePeriod);
            }

            return availablePeriods;
          };

          const availablePeriods = calculateAvailablePeriods();
          
          dispatch(handleDataChangeError(availablePeriods));
          dispatch(setShowPeriods(true));
        } else if(tableIsAvailable) {
          dispatch(saveDataChangesInAPI(type, id, changedData));
          dispatch(setAlertSuccess(true));
        }
      })
      .catch((err) => {
        dispatch(fetchTableReservationsError(err.message || true));
      });
  }
};

const saveDataChangesInAPI = (type, id, changedData) => {
  return (dispatch) => {
    dispatch(saveDataChangesStarted());

    let reservationURL = '';

    if(type === 'booking') {
      reservationURL = api.bookings;
    } else if(type === 'event') {
      reservationURL = api.events;
    }
    
    Axios
      .put(`${api.url}/api/${reservationURL}/${id}`, changedData)
      .then(() => {
        dispatch(saveDataChangesSuccess());
        dispatch(handleDataChangeSuccess());
      })
      .catch((err) => {
        dispatch(saveDataChangesError(err.message || true));
      });
  }
};

/* reducer */
export default function reducer(statePart = {}, action = {}) {
  switch (action.type) {
    case CHANGE_DATE: {
      return {
        ...statePart,
        date: action.payload,
      }
    }
    case CHANGE_HOUR: {
      return {
        ...statePart,
        hour: action.payload,
      }
    }
    case CHANGE_TABLE: {
      return {
        ...statePart,
        table: action.payload,
      }
    }
    case CHANGE_REPEAT: {
      return {
        ...statePart,
        repeat: action.payload,
      }
    }
    case CHANGE_DURATION: {
      return {
        ...statePart,
        duration: action.payload,
      }
    }
    case CHANGE_PEOPLE: {
      return {
        ...statePart,
        ppl: action.payload,
      }
    }
    case CHANGE_BREAD_STARTER: {
      return {
        ...statePart,
        starters: {
          ...statePart.starters,
          bread: action.payload,
        },
      }
    }
    case CHANGE_LEMON_WATER_STARTER: {
      return {
        ...statePart,
        starters: {
          ...statePart.starters,
          lemonWater: action.payload,
        },
      }
    }
    case HANDLE_DATA_CHANGE_START: {
      return {
        ...statePart,
        handleDataChange: {
          ...statePart.handleDataChange,
          state: {
            active: true,
            error: false,
          },
        },
      }
    }
    case HANDLE_DATA_CHANGE_SUCCESS: {
      return {
        ...statePart,
        handleDataChange: {
          ...statePart.handleDataChange,
          state: {
            active: false,
            error: false,
          },
        },
      }
    }
    case HANDLE_DATA_CHANGE_ERROR: {
      return {
        ...statePart,
        handleDataChange: {
          ...statePart.handleDataChange,
          state: {
            active: false,
            error: true,
          },
          availablePeriods: action.payload,
        },
      }
    }
    case SET_SHOW_PERIODS: {
      return {
        ...statePart,
        handleDataChange: {
          ...statePart.handleDataChange,
          showPeriods: action.payload,
        },
      }
    }
    case FETCH_TABLE_RESERVATIONS_START: {
      return {
        ...statePart,
        tableReservations: {
          ...statePart.tableReservations,
          loading: {
            active: true,
            error: false,
          },
        },
      }
    }
    case FETCH_TABLE_RESERVATIONS_SUCCESS: {
      return {
        ...statePart,
        tableReservations: {
          loading: {
            active: false,
            error: false,
          },
          data: action.payload,
        },
      }
    }
    case FETCH_TABLE_RESERVATIONS_ERROR: {
      return {
        ...statePart,
        tableReservations: {
          ...statePart.tableReservations,
          loading: {
            active: false,
            error: action.payload,
          },
        },
      }
    }
    case SAVE_DATA_CHANGES_START: {
      return {
        ...statePart,
        saveDataChanges: {
          ...statePart.saveDataChanges,
          active: true,
          error: false,
        },
      }
    }
    case SAVE_DATA_CHANGES_SUCCESS: {
      return {
        ...statePart,
        saveDataChanges: {
          ...statePart.saveDataChanges,
          active: false,
          error: false,
        },
      }
    }
    case SAVE_DATA_CHANGES_ERROR: {
      return {
        ...statePart,
        saveDataChanges: {
          ...statePart.saveDataChanges,
          active: false,
          error: action.payload,
        },
      }
    }
    case SET_ALERT_SUCCESS: {
      return {
        ...statePart,
        saveDataChanges: {
          ...statePart.saveDataChanges,
          alertSuccess: action.payload,
        },
      }
    }
    default:
      return statePart;
  }
}