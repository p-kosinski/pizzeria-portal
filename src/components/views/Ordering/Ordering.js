import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar'

import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

import DoneIcon from '@material-ui/icons/Done';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ReceiptIcon from '@material-ui/icons/Receipt';

import {lightGreen, teal, yellow, orange, grey} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  tableArticle: {
    margin: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  tableOrders: {
    padding: theme.spacing(1),
  },
  orderSummary: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    borderWidth: 1,
    borderStyle: 'solid',
  },
  singleSummaryInfo: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  statusIcon: {
    backgroundColor: 'white',
    color: grey[600],
  },
  New: {
    backgroundColor: orange[200],
    borderColor: orange[300],
  },
  Ordered: {
    backgroundColor: yellow[200],
    borderColor: yellow[300],
  },
  Ready: {
    backgroundColor: teal[200],
    borderColor: teal[300],
  },
  Delivered: {
    backgroundColor: lightGreen[200],
    borderColor: lightGreen[300],
  },
}));


const Ordering = () => {
  const classes = useStyles();

  return (
    <Container>
      <Link to={process.env.PUBLIC_URL + '/ordering/new'}>New Order</Link>
      <Link to={process.env.PUBLIC_URL + '/ordering/order/123abc'}>Order 123abc</Link>
      <article className={classes.tableArticle}>
        <AppBar position="relative" elevation={3}>
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Table 1
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="Add">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper elevation={1} className={classes.tableOrders}>
          <Card elevation={2} className={classes.orderSummary + ' ' + classes.Ready}>
            <Box
              width="100%"
              display="inline-flex"
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Avatar className={classes.statusIcon}>
                  <FastfoodIcon />
                </Avatar>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                width="100%"
              >
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Status:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>ready</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Order Time:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>2021-07-17 15:30:00</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Total:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>$120</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box minWidth="48px" minHeight="48px">
                <IconButton aria-label="deliver">
                  <CheckIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
          <Card elevation={2} className={classes.orderSummary + ' ' + classes.Ordered}>
            <Box
              width="100%"
              display="inline-flex"
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Avatar className={classes.statusIcon}>
                  <ReceiptIcon />
                </Avatar>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                width="100%"
              >
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Status:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>ordered</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Order Time:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>2021-07-17 15:30:00</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Total:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>$120</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box minWidth="48px" minHeight="48px"></Box>
            </Box>
          </Card>
        </Paper>
      </article>
      <article className={classes.tableArticle}>
        <AppBar position="relative" elevation={3}>
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Table 2
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="Add">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper elevation={1} className={classes.tableOrders}>
          <Card elevation={2} className={classes.orderSummary + ' ' + classes.New}>
            <Box
              width="100%"
              display="inline-flex"
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Avatar className={classes.statusIcon}>
                  <PriorityHighIcon />
                </Avatar>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                width="100%"
              >
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Status:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>new</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Order Time:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>2021-07-17 15:30:00</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Total:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>$120</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box minWidth="48px" minHeight="48px"></Box>
            </Box>
          </Card>
          <Card elevation={2} className={classes.orderSummary + ' ' + classes.Delivered}>
            <Box
              width="100%"
              display="inline-flex"
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Avatar className={classes.statusIcon}>
                  <DoneIcon />
                </Avatar>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                width="100%"
              >
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Status:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>delivered</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Order Time:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>2021-07-17 15:30:00</span>
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  flexDirection="row"
                  className={classes.singleSummaryInfo}
                >
                  <Box>
                    <Typography variant="body1">
                      <strong>Total:&nbsp;</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <span>$120</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box minWidth="48px" minHeight="48px"></Box>
            </Box>
          </Card>
        </Paper>
      </article>
    </Container>
  );
};

export default Ordering;