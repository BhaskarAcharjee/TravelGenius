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
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatResponseText } from "../utils/formatText";
import { steps } from "../constants/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AskAI = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState("");
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
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
      setResponse(formatResponseText(aiResponse));
    } catch (error) {
      setResponse("Failed to get AI recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementDays = () => setDays((prev) => prev + 1);
  const handleDecrementDays = () => days > 1 && setDays((prev) => prev - 1);

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
    <Paper
      sx={{
        p: 3,
        backgroundColor: "#f0f2f5",
        borderRadius: theme.shape.borderRadius,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        mb: 3,
      }}
      id="ai-section"
    >
      <Typography variant="h5" gutterBottom>
        <b>Let TravelGenius Plan Your Perfect Trip</b>
      </Typography>
      <Grid container spacing={3}>
        {!isMobile && (
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              sx={{ backgroundColor: "transparent", mb: 3 }}
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {step.icon} {step.label}
                    </Box>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        )}

        <Grid item xs={12}>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[0].description}
              </Typography>
              <TextField
                label="Which City?"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isNextButtonDisabled()}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[1].description}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <IconButton onClick={handleDecrementDays}>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  label="Days"
                  variant="outlined"
                  value={days}
                  fullWidth
                  inputProps={{
                    readOnly: true,
                    style: { textAlign: "center" },
                  }}
                  required
                />
                <IconButton onClick={handleIncrementDays}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isNextButtonDisabled()}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[2].description}
              </Typography>
              <TextField
                label="Budget"
                variant="outlined"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                fullWidth
                select
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="Economic">Economic</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Luxury">Luxury</MenuItem>
              </TextField>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isNextButtonDisabled()}
                >
                  Next
                </Button>
              </Box>
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {steps[3].description}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {steps[3].options.map((option) => (
                  <Button
                    key={option.label}
                    variant="outlined"
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
              <Button onClick={handleBack} sx={{ mt: 2 }}>
                Back
              </Button>
            </Box>
          )}

          {activeStep === 4 && (
            <Box
              sx={{
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: response }} />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AskAI;
