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
  Chip,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExploreIcon from "@mui/icons-material/Explore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoodIcon from "@mui/icons-material/Mood";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatResponseText } from "../utils/formatText";

const aiApiKey = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyDS8bqmuBbRCG4s_BB9aL-IUqUfNYIlwBY";
const genAI = new GoogleGenerativeAI(aiApiKey);

const AIWrapperPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
  color: "#FFFFFF",
  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  position: "relative",
  overflow: "hidden",
}));

const PresetChip = styled(Chip)({
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  color: "#38BDF8",
  fontWeight: 600,
  fontSize: "0.85rem",
  borderRadius: "10px",
  border: "1px solid rgba(14, 165, 233, 0.3)",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#0EA5E9",
    color: "#FFFFFF",
  },
});

const AskAI = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Balanced");
  const [mood, setMood] = useState("Explore & Foodie");
  const [response, setResponse] = useState("");
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const stepsList = [
    { label: "Destination", icon: <ExploreIcon />, desc: "Select your destination city" },
    { label: "Duration", icon: <DateRangeIcon />, desc: "How many days is your trip?" },
    { label: "Budget", icon: <AttachMoneyIcon />, desc: "Choose your spending style" },
    { label: "Vibe", icon: <MoodIcon />, desc: "What activities do you enjoy?" },
  ];

  const handleNext = () => {
    if (activeStep === stepsList.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    setCity("");
    setDays(3);
    setBudget("Balanced");
    setMood("Explore & Foodie");
    setResponse("");
    setRawText("");
  };

  const applyPreset = (presetCity, presetDays, presetBudget, presetMood) => {
    setCity(presetCity);
    setDays(presetDays);
    setBudget(presetBudget);
    setMood(presetMood);
    setActiveStep(3);
  };

  const handleSubmit = async () => {
    setActiveStep(4);
    setLoading(true);
    setResponse("");

    const prompt = `Act as an expert travel guide. Plan a detailed ${days}-day itinerary to ${city} with a ${budget} budget focusing on ${mood} activities.
Format the output clearly using Markdown bold header titles for Day 1, Day 2, Day 3, specifying Morning, Afternoon, and Evening activities with estimated costs and local tips.`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setRawText(text);
      setResponse(formatResponseText(text));
    } catch (error) {
      console.error("AI Generation Error:", error);
      // Fallback AI itinerary preview if API offline
      const fallbackText = `**Day 1: Arrival & Historic Center in ${city}**
• **Morning:** Check into your hotel and enjoy local coffee & pastries at a traditional cafe.
• **Afternoon:** Guided walking tour through the historic district and main square.
• **Evening:** Sunset dining at a top-rated local bistro with authentic wine pairings.

**Day 2: Culture & Hidden Gems**
• **Morning:** Visit famous museums and art galleries (book tickets early).
• **Afternoon:** Lunch at a bustling street food market followed by riverfront walks.
• **Evening:** Panoramic rooftop views and cocktails at a skyline terrace.

**Day 3: Scenic Excursions & Shopping**
• **Morning:** Short day trip to nearby botanical gardens or scenic viewpoints.
• **Afternoon:** Souvenir shopping at local artisan boutiques and craft markets.
• **Evening:** Farewell dinner at a Michelin-rated restaurant with local live music.`;

      setRawText(fallbackText);
      setResponse(formatResponseText(fallbackText));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const downloadItinerary = () => {
    const element = document.createElement("a");
    const file = new Blob([rawText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${city || "Trip"}_${days}Day_Itinerary.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AIWrapperPaper id="ai-section">
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <AutoAwesomeIcon sx={{ color: "#38BDF8", fontSize: 32 }} />
          <div>
            <Typography variant="h5" fontWeight={800} letterSpacing="-0.01em">
              TravelGenius <span className="gradient-text-primary">AI Concierge</span>
            </Typography>
            <Typography variant="body2" color="#94A3B8">
              Generate custom day-by-day itineraries tailored to your exact budget & preferences.
            </Typography>
          </div>
        </Box>

        {/* Preset Prompt Chips */}
        <Box display="flex" gap={1} flexWrap="wrap">
          <PresetChip label="🏖️ 3-Day Bali Chill" onClick={() => applyPreset("Bali", 3, "Balanced", "Beach & Wellness")} />
          <PresetChip label="🍲 4-Day Paris Foodie" onClick={() => applyPreset("Paris", 4, "Luxury", "Gourmet Dining")} />
          <PresetChip label="🚀 5-Day Tokyo Culture" onClick={() => applyPreset("Tokyo", 5, "Economic", "Tech & Anime")} />
        </Box>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4, display: { xs: "none", md: "flex" } }}>
        {stepsList.map((step, idx) => (
          <Step key={step.label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: activeStep >= idx ? "#0EA5E9 !important" : "rgba(255,255,255,0.2) !important",
                },
              }}
            >
              <Typography fontWeight={600} color={activeStep >= idx ? "#FFFFFF" : "#94A3B8"}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} mb={1}>
              Where is your next destination?
            </Typography>
            <TextField
              placeholder="Enter city (e.g. Rome, Tokyo, New York, Cape Town)"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{
                bgcolor: "rgba(255,255,255,0.06)",
                borderRadius: 3,
                input: { color: "#FFF", fontWeight: 600 },
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              }}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={700} mb={2}>
              How many days will you stay?
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
              <IconButton
                onClick={() => setDays((prev) => Math.max(1, prev - 1))}
                sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "#FFF" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h3" fontWeight={800} color="#0EA5E9">
                {days} {days === 1 ? "Day" : "Days"}
              </Typography>
              <IconButton
                onClick={() => setDays((prev) => prev + 1)}
                sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "#FFF" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" fontWeight={700} mb={1}>
              Select your budget category:
            </Typography>
            <TextField
              select
              fullWidth
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              sx={{
                bgcolor: "rgba(255,255,255,0.06)",
                borderRadius: 3,
                color: "#FFF",
                select: { color: "#FFF", fontWeight: 600 },
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              }}
            >
              <MenuItem value="Economic">💰 Economic / Backpacker</MenuItem>
              <MenuItem value="Balanced">💳 Balanced / Moderate</MenuItem>
              <MenuItem value="Luxury">✨ Premium / Luxury</MenuItem>
            </TextField>
          </Box>
        )}

        {activeStep === 3 && (
          <Box>
            <Typography variant="h6" fontWeight={700} mb={2}>
              What type of experience are you looking for?
            </Typography>
            <Grid container spacing={2}>
              {["Explore & Foodie", "Nature & Wildlife", "Relaxation & Spa", "Culture & Museums", "Nightlife & Party"].map(
                (option) => (
                  <Grid item xs={6} sm={4} key={option}>
                    <Button
                      fullWidth
                      variant={mood === option ? "contained" : "outlined"}
                      onClick={() => setMood(option)}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        borderColor: "rgba(255,255,255,0.2)",
                        color: "#FFF",
                        fontWeight: 600,
                        background: mood === option ? "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)" : "transparent",
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        )}

        {activeStep === 4 && (
          <Box>
            {loading ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={2}>
                <CircularProgress size={48} sx={{ color: "#0EA5E9" }} />
                <Typography variant="h6" fontWeight={600} color="#94A3B8">
                  Crafting your personalized {days}-day itinerary to {city}...
                </Typography>
              </Box>
            ) : (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
                  <Typography variant="h6" fontWeight={800} color="#38BDF8">
                    ✨ Your Customized Itinerary for {city || "Trip"}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                      onClick={copyToClipboard}
                      sx={{ color: "#FFF", borderColor: "rgba(255,255,255,0.3)" }}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={downloadItinerary}
                      sx={{ background: "#10B981" }}
                    >
                      Export
                    </Button>
                    <IconButton color="inherit" onClick={handleReset}>
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />
                <Box
                  sx={{
                    maxHeight: "450px",
                    overflowY: "auto",
                    p: 3,
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderRadius: 3,
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                    "& b": { color: "#38BDF8" },
                    "& h3": { color: "#FFFFFF", mt: 2, mb: 1 },
                  }}
                  dangerouslySetInnerHTML={{ __html: response }}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Stepper Navigation Actions */}
      {activeStep < 4 && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ color: "#94A3B8" }}>
            Back
          </Button>
          <Button
            variant="contained"
            disabled={activeStep === 0 && !city.trim()}
            onClick={handleNext}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1,
              background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
            }}
          >
            {activeStep === 3 ? "Generate Itinerary ✨" : "Next"}
          </Button>
        </Box>
      )}
    </AIWrapperPaper>
  );
};

export default AskAI;
