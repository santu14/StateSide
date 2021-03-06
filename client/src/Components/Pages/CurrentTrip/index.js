import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Budget from "./Components/Budget";
import Steps from "./Components/Steps";
import BudgetTable from "./Components/BudgetTable";
import CategorySelector from "./Components/CategorySelector";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { Route} from "react-router-dom";
import ImgGrid from "./Components/ImgGrid";
import UploadBtn from "./Components/ImgGrid/UploadButton";
import Title from "../../Title";
import Footer from "../../Footer";
import Box from "@material-ui/core/Box";
import Navigation from "../../Navigation";
import ItineraryForm from "./Components/ItineraryForm";
import API from "../../../utils/API";
import Cookies from "js-cookie";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  jumbotron: {
    background: "linear-gradient(45deg, #BB86FC 10%, #29025a 90%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  headline: {
    color: "white",
    fontSize: 100,
    fontWeight: 300,
    letterSpacing: "4px",
    padding: theme.spacing(4, 0, 1),
  },
  carousel: {
    padding: theme.spacing(6, 20),
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  appBar: {
    position: "relative",
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    // overflow: 'auto',
    flexDirection: "column",
  },
  fixedHeight: {
    height: 500,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  dates: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
  },
  budget: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function CurrentTrip() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#BB86FC",
      },
      type: "dark",
    },
  });

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const initialActivityState = {
    activity: "",
    date: "",
  };
const initialCurrentTrip= {
  expenses: 0,
    budgetTableData: {
      food: 0,
      activities: 0,
      flight: 0,
      hotel: 0,
      transportation: 0,
      misc: 0,
    },
    activities: [],
    photos: [],
    budget: 0,
    _id: "",
    city: "",
    state: "",
}
  

  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(initialCurrentTrip);
  const [activity, setActivity] = useState(initialActivityState); 
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [activities, setActivities] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(0);
 
  
  const encodedID = Cookies.getJSON("user");
  const decodeArr = encodedID.split('"');
  const userID = decodeArr[1];

  useEffect(() => {
    API.getUser(userID).then((user) => {
     
      setTrips(user.data.trips);
    });
  }, []);

  useEffect(() => {
    findCurrentTrip();
  }, [trips]);

  useEffect(() => {
    // console.log("current: ", currentTrip);
    subtractExpensesFromBudget(currentTrip.expenses);
    setActivities(currentTrip.activities);
    setCurrentBudget(currentTrip.budget - expensesTotal)
  }, [currentTrip]);

  useEffect(() => {
    // console.log("expenses: ", expensesTotal);
    // console.log(typeof expensesTotal);
    // console.log("budget: ", currentTrip.budget);
    // console.log(typeof currentTrip.budget);
    setCurrentBudget(currentTrip.budget - expensesTotal);
  }, [expensesTotal]);

  const findCurrentTrip = () => {
    if(trips){

      trips.forEach((trip) => {
        if (trip.current === "current") {
          API.getTrip(trip._id).then((response) => {
            const {
              activities,
              budget,
              city,
              current,
              departure,
              expenses,
              photos,
              lat,
              long,
              state,
              _v,
              _id,
            } = response.data;
           
            function crunchNumbers(array) {
              const object = {
                food: 0,
                activities: 0,
                flight: 0,
                hotel: 0,
                transportation: 0,
                misc: 0,
              };
              array.forEach((item) => {
                const { category, expense } = item;
                object[category] += expense;
              });
              return object;
            }
            // console.log({budget})
            setCurrentTrip({
              ...currentTrip,
              activities,
              budget,
              budgetTableData: crunchNumbers(expenses),
              city,
              current,
              departure,
              expenses,
              photos,
              lat,
              long,
              return: response.data.return,
              state,
              _v,
              _id,
            });
          });
        }
        // console.log("current trip: ", trip);
      });
    }
    };
    
    const handleActivitySubmit = () => {
      API.saveActivity(currentTrip._id, activity);
      setActivities((state) => [...state, activity]);
    };

  const handleActivityInputChange = ({ target: { name, value } }) =>
    setActivity({ ...activity, [name]: value });


  const subtractExpensesFromBudget = async (expenses) => {
    if (expenses) {
      let count = 0;
      await expenses.forEach((expense) => {
        count = count + expense.expense;
        // console.log("total:", count, "expense: ", expense.expense);
      });
      setExpensesTotal(count);
      // console.log("total expense: ", count);
      return;
    }
    setExpensesTotal(0);
    return

  };
  const handleTripEnd = () =>{
    API.updateTrip(currentTrip._id, {...currentTrip, current: "past"})
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        {/* Hero unit */}
        <div className={classes.jumbotron}>
          <Container maxWidth="sm">
            <Typography
              className={classes.headline}
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {currentTrip.city}, {currentTrip.state}
            </Typography>

            <Typography
              className={classes.dates}
              variant="h4"
              color="inherit"
              noWrap
            >
             From {moment(currentTrip.departure).format("MMMM Do")} To {moment(currentTrip.return).format("MMMM Do")}
            </Typography>
          </Container>
        </div>
        <Container maxWidth="lg">
          <Steps />
          <main className={classes.layout}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={8}>
                  <Paper className={fixedHeightPaper}>
                    <Typography component="h1" variant="h4" align="left">
                      Trip Itinerary
                    </Typography>

                    <ItineraryForm
                      handleSubmit={handleActivitySubmit}
                      handleOnChange={handleActivityInputChange}
                      activities={activities}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper className={fixedHeightPaper}>
                    <div>
                      {" "}
                      <Budget budget={currentBudget} />{" "}
                    </div>
                    <CategorySelector reset={findCurrentTrip} currentTrip={currentTrip} />
                    <BudgetTable
                      data={currentTrip.budgetTableData}
                      expenses={currentTrip.expenses}
                    />
                  </Paper>
                </Grid>
                 {/* Activity search */}
             {/* <Grid item xs={12} justify="center">
                  <Paper className={classes.paper}>
                    <Title>
                      <UploadBtn />
                    </Title>
                    <ImgGrid />
                  </Paper>
                </Grid> */}
                
                <Grid item xs={12} justify="center">
                  <Paper className={classes.paper}>
                    <Title>
                      <UploadBtn id={currentTrip._id} reset={findCurrentTrip}/>
                    </Title>
                    <ImgGrid photos={currentTrip.photos} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                        <Route
                          render={({ history }) => (
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => {
                                history.push("/")
                                handleTripEnd()
                              }}
                              className={classes.button}
                              
                            >
                              End Current Trip
                            </Button>
                          )}
                        />
                      </Grid>
              </Grid>
            </div>
          </main>
          <Box pt={4} pb={4}>
            <Navigation />
            <Footer />
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
