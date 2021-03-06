import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AuthForms from "../AuthForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    color: "white",
    fontSize: 70,
    fontWeight: 700,
    textShadow: "0px 3px 3px rgba(0, 0, 0, 0.6)",
  },
  icon: {
    color: "white",
    fontSize: 60,
    textShadow: "0px 3px 3px rgba(0, 0, 0, 0.6)",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    color: "#BB86FC",
    border: "2px solid #BB86FC",
    backgroundColor: "transparent",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
 
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Grid container component='main' className={classes.root}>
          <CssBaseline />
          <Grid item xs={12} sm={4} md={7} className={classes.image}>
            <Typography className={classes.icon}>
              <i className='fas fa-wave-square'></i>
            </Typography>
            <Typography className={classes.headline}>STATESIDE</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>

              <AuthForms/>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
 

}
