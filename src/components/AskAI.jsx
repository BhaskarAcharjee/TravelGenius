import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { formatResponseText } from "../utils/formatText";
import { steps } from "../constants/constants";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const AskAI = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState("");
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackMain = () => {
    setActiveStep(0);
    setCity("");
    setDays(1);
    setBudget("");
    setMood("");
    setResponse("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prompt = `Plan a ${days}-day trip to ${city} with a ${budget} budget (in Indian Rs.). Focus on ${mood} activities.`;
      const result = await model.generateContent(prompt);
      const aiResponse = await result.response.text();
      const formatedResponse = formatResponseText(aiResponse);
      setResponse(formatedResponse);
    } catch (error) {
      setResponse("Failed to get AI recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementDays = () => {
    setDays((prevDays) => prevDays + 1);
  };

  const handleDecrementDays = () => {
    if (days > 1) {
      setDays((prevDays) => prevDays - 1);
    }
  };

  const isNextButtonDisabled = () => {
    switch (activeStep) {
      case 0:
        return city.trim() === "";
      case 1:
        return days < 1;
      case 2:
        return budget.trim() === "";
      case 3:
        return mood.trim() === "";
      default:
        return false;
    }
  };

  return (
    <Paper className={classes.container} id="ai-section">
      <Typography variant="h5" gutterBottom>
        <b>Let TravelGenius Plan Your Perfect Trip</b>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {!isMobile && (
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Box className={classes.stepLabel}>
                      {step.icon}
                      {step.label}
                    </Box>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
        </Grid>
        <Grid item xs={12}>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[0].description}
              </Typography>
              <form
                className={classes.form}
                onSubmit={(e) => e.preventDefault()}
              >
                <TextField
                  label="Which City?"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  required
                />
                <Box className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={isNextButtonDisabled()}
                  >
                    Next
                  </Button>
                </Box>
              </form>
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[1].description}
              </Typography>
              <Box className={classes.form}>
                <IconButton
                  aria-label="decrement days"
                  onClick={handleDecrementDays}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  label="Days"
                  variant="outlined"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  fullWidth
                  inputProps={{
                    readOnly: true,
                    style: { textAlign: "center" },
                  }}
                  required
                />
                <IconButton
                  aria-label="increment days"
                  onClick={handleIncrementDays}
                >
                  <AddIcon />
                </IconButton>
                <Box className={classes.buttonContainer}>
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={isNextButtonDisabled()}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[2].description}
              </Typography>
              <form
                className={classes.form}
                onSubmit={(e) => e.preventDefault()}
              >
                <TextField
                  label="Budget"
                  variant="outlined"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  fullWidth
                  select
                  required
                >
                  <MenuItem value="Economic">Economic</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Luxury">Luxury</MenuItem>
                </TextField>
                <Box className={classes.buttonContainer}>
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={isNextButtonDisabled()}
                  >
                    Next
                  </Button>
                </Box>
              </form>
            </Box>
          )}
          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[3].description}
              </Typography>
              <Box className={classes.form}>
                {steps[3].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    onClick={() => {
                      setMood(option.label);
                      handleNext();
                      handleSubmit();
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </Box>
              <Box className={classes.buttonContainer}>
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              </Box>
            </Box>
          )}
          {activeStep === 4 && (
            <Box>
              <Box className={classes.outputBox}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: response }} />
                )}
              </Box>
              <Box className={classes.buttonContainer}>
                <Button onClick={handleBackMain} className={classes.button}>
                  Back to Main
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: "#f0f2f5",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  outputBox: {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  button: {
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(to right, #feb47b, #ff7e5f)",
    },
  },
  stepper: {
    backgroundColor: "transparent",
    marginBottom: theme.spacing(3),
  },
  icon: {
    fontSize: "2rem",
    marginRight: theme.spacing(1),
    verticalAlign: "middle",
  },
  stepLabel: {
    display: "flex",
    alignItems: "center",
  },
}));

export default AskAI;
