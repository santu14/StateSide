import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  makeStyles,
  
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  depositContext: {
    margin: theme.spacing(2, 0),
  },
  icon: {
    color: "white",
    background: "#BB86FC",
  },
  root: {
    maxHeight: 225,
    overflow: "auto",
    position: "relative",
  },
  button: {
    backgroundColor: "transparent",
    border: "2px solid #BB86FC",
    color: "white",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#BB90FF",
      color: "#121212",
    },
  },
}));

export default function ActivitiesForm(props) {
  const classes = useStyles();

  const renderActivities = () => {
    if (props.activities) {
      return props.activities.map((activity, i) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.icon}>
              <ScheduleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={activity.activity} 
          secondary={moment(activity.date).format('MM/DD/YY LT')} />
        </ListItem>
      ));
    } else {
      return;
    }
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography color='textSecondary' className={classes.depositContext}>
            Add to your schedule
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='activity'
            name='activity'
            label='Activity'
            fullWidth
            onChange={props.handleOnChange}
            // autoComplete="shipping address-level2"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id='datetime-local'
            type='datetime-local'
            name='date'
            label='Date / Time'
            defaultValue='2021-02-02T10:30'
            fullWidth
            onChange={props.handleOnChange}
          />
        </Grid>
        <Grid container justify='center'>
          <Fab
            variant='extended'
            aria-label='add'
            size='small'
            onClick={props.handleSubmit}
            className={classes.button}>
            <AddIcon />
          add activity
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12}>
          <List className={classes.root}>{renderActivities()}</List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
