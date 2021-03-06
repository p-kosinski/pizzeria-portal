import React from 'react';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from '@mui/material/Grid';

import TableHourColumn from '../../features/TableHourColumn/TableHourColumn';
import TableColumn from '../../features/TableColumn/TableColumn';

import { tables } from '../../../settings';

class Tables extends React.Component {
  static propTypes = {
    eventsLoading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    }),
    fetchEvents: PropTypes.func,
    bookingsLoading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    }),
    fetchBookings: PropTypes.func,
    changeView: PropTypes.func,
  }

  componentDidMount() {
    const { changeView, fetchEvents, fetchBookings } = this.props;

    changeView('Tables');
    fetchEvents();
    fetchBookings();
  }

  render() {
    const { eventsLoading, bookingsLoading } = this.props;

    if(eventsLoading.active && bookingsLoading.active) {
      return (
        <Container>
          <Backdrop open={eventsLoading.active && bookingsLoading.active}>
            <CircularProgress sx={{color: 'white'}} />
          </Backdrop>
        </Container>
      );
    } else if(eventsLoading.error || bookingsLoading.error) {
      return (
        <Container>
          {eventsLoading.error &&
            <Box width={1/1} py='1rem'>
              <Alert severity='error' mt='2rem'>
                <AlertTitle>Error!</AlertTitle>
                {eventsLoading.error}
              </Alert>
            </Box>}
          {bookingsLoading.error &&
            <Box width={1/1} py='1rem'>
              <Alert severity='error' mt='2rem'>
                <AlertTitle>Error!</AlertTitle>
                {bookingsLoading.error}
              </Alert>
            </Box>}
        </Container>
      );
    } else {
      const openHour = '12:00';
      const workingHours = 12;
      const timeInterval = 0.5;
      const tableRows = workingHours / timeInterval + 1;
      const cellHeight = 45;

      return (
        <Container sx={{ my: {xs: 2, sm: 3, md: 4} }}>
          <Box justifyContent='center' >
            <Grid container marginX='auto' maxWidth='700px'>
              <TableHourColumn
                tableRows={tableRows}
                openHour={openHour}
                cellHeight={cellHeight}
              />
              {tables.map((table, i) => {
                const thisTableisLast = table === tables[tables.length - 1];

                return (
                  <React.Fragment key={i}>
                    <TableColumn
                      table={table}
                      borderRight={thisTableisLast}
                      tableRows={tableRows}
                      openHour={openHour}
                      timeInterval={timeInterval}
                      cellHeight={cellHeight}
                    />
                  </React.Fragment>
                );
              })}
            </Grid>
          </Box>
        </Container>
      );
    }
  }
}

export default Tables;