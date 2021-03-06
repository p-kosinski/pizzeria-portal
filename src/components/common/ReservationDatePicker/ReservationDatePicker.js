import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterLuxon';
import DatePicker from '@mui/lab/DatePicker';

class ReservationDatePicker extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['event', 'booking']).isRequired,
    id: PropTypes.number.isRequired,
    initialDate: PropTypes.string.isRequired,
    date: PropTypes.object,
    changeDate: PropTypes.func,
  }

  componentDidMount() {
    const { initialDate, changeDate } = this.props;

    changeDate(DateTime.fromISO(initialDate));
  }

  render() {
    const { initialDate, date, changeDate } = this.props;

    const minDate = DateTime.fromISO(initialDate);
    const maxDate = minDate.plus({ days: 14 });

    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label='Date'
          minDate={minDate}
          maxDate={maxDate}
          value={date}
          onChange={(newDate) => {
            changeDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
}

export default ReservationDatePicker;