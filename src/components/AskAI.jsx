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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatResponseText } from "../utils/formatText";
import { steps } from "../constants/constants";
import { styled } from "@mui/material/styles";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const AskAI = () => {
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
      setActiveStep((prev) => prev + 1);
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
      const aiResponse = await result.text();
      setResponse(formatResponseText(aiResponse));
    } catch (error) {
      setResponse("Failed to get AI recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper id="ai-section"
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        borderRadius: 2,
        boxShadow: 3,
        color: "#fff",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Let TravelGenius Plan Your Perfect Trip
      </Typography>
      {!isMobile && (
        <Stepper
          activeStep={activeStep}
          sx={{ backgroundColor: "transparent", mb: 3 }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <Grid container spacing={2}>
        {activeStep === 0 && (
          <TextField
            label="Which City?"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />
        )}
        {activeStep === 1 && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setDays((prev) => Math.max(1, prev - 1))}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              label="Days"
              variant="outlined"
              value={days}
              inputProps={{ readOnly: true, style: { textAlign: "center" } }}
              fullWidth
            />
            <IconButton onClick={() => setDays((prev) => prev + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
        {activeStep === 2 && (
          <TextField
            label="Budget"
            variant="outlined"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            fullWidth
            select
          >
            <MenuItem value="Economic">Economic</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Luxury">Luxury</MenuItem>
          </TextField>
        )}
        {activeStep === 3 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {steps[3].options.map((option) => (
              <Button
                key={option.label}
                variant="outlined"
                onClick={() => {
                  setMood(option.label);
                  handleNext();
                }}
              >
                {" "}
                {option.label}{" "}
              </Button>
            ))}
          </Box>
        )}
        {activeStep === 4 && (
          <Box
            sx={{
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              border: "2px solid white",
              borderRadius: 1,
              mt: 2,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: response }} />
            )}
          </Box>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        {activeStep > 0 && (
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
        {activeStep < 3 && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!city && activeStep === 0}
          >
            Next
          </Button>
        )}
        {activeStep === 3 && (
          <Button variant="contained" onClick={handleSubmit}>
            Get Plan
          </Button>
        )}
        {activeStep === 4 && (
          <Button variant="contained" onClick={handleBackMain}>
            Back to Main
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default AskAI;
