import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  InputBase,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const HeroWrapper = styled("section")(({ theme }) => ({
  position: "relative",
  minHeight: "92vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at 50% 20%, #1E293B 0%, #0F172A 100%)",
  color: "#FFFFFF",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-15%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
    height: "500px",
    background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
}));

const BadgeChip = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 16px",
  borderRadius: "30px",
  background: "rgba(14, 165, 233, 0.12)",
  border: "1px solid rgba(14, 165, 233, 0.3)",
  color: "#38BDF8",
  fontSize: "0.85rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
  marginBottom: "24px",
});

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 800,
  fontSize: "3.5rem",
  lineHeight: 1.15,
  letterSpacing: "-0.03em",
  marginBottom: "20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  color: "#94A3B8",
  fontWeight: 400,
  fontSize: "1.2rem",
  maxWidth: "700px",
  margin: "0 auto 36px auto",
  lineHeight: 1.6,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "720px",
  padding: "6px 8px 6px 16px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  marginBottom: "24px",
}));

const QuickPill = styled(Chip)({
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  color: "#E2E8F0",
  fontWeight: 600,
  fontSize: "0.85rem",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#0EA5E9",
    color: "#FFFFFF",
    borderColor: "#0EA5E9",
    transform: "translateY(-2px)",
  },
});

const StatBox = styled(Box)({
  textAlign: "center",
  padding: "16px",
  background: "rgba(255, 255, 255, 0.03)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.06)",
});

const Hero = ({ onSearchCity }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularDestinations = [
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Bali", lat: -8.4095, lng: 115.1889 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchCity) {
      onSearchCity(searchQuery.trim());
    }
  };

  const handlePresetClick = (city) => {
    setSearchQuery(city.name);
    if (onSearchCity) {
      onSearchCity(city.name, { lat: city.lat, lng: city.lng });
    }
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroWrapper id="hero">
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
          {/* Animated Badge */}
          <BadgeChip className="animate-float">
            <AutoAwesomeIcon fontSize="small" />
            <span>AI-POWERED SMART TRAVEL PLATFORM</span>
          </BadgeChip>

          {/* Headline */}
          <MainTitle variant="h1">
            Explore The World With <br />
            <span className="gradient-text-primary">Intellectual Precision</span>
          </MainTitle>

          {/* Subtitle */}
          <SubTitle variant="body1">
            Uncover handpicked Michelin dining, boutique accommodations, iconic landmarks, and customized AI trip itineraries tailored to your budget.
          </SubTitle>

          {/* Search Box */}
          <SearchPaper component="form" onSubmit={handleSearchSubmit}>
            <LocationOnIcon sx={{ color: "#0EA5E9", mr: 1, fontSize: 28 }} />
            <InputBase
              placeholder="Where do you want to explore? (e.g. Paris, Tokyo, Bali...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1, fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#0F172A" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "12px",
                px: 3,
                py: 1.2,
                background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
                fontWeight: 700,
              }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </SearchPaper>

          {/* Quick Destination Chips */}
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" justifyContent="center" mb={6}>
            <Typography variant="body2" sx={{ color: "#94A3B8", fontWeight: 600, mr: 1 }}>
              Popular:
            </Typography>
            {popularDestinations.map((city) => (
              <QuickPill key={city.name} label={city.name} onClick={() => handlePresetClick(city)} />
            ))}
          </Box>

          {/* Category Pill Buttons */}
          <Grid container spacing={2} justifyContent="center" maxWidth="900px" mb={6}>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleScrollToSection("list-section")}
                startIcon={<RestaurantIcon sx={{ color: "#0EA5E9" }} />}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  py: 1.5,
                  borderRadius: "14px",
                  "&:hover": { borderColor: "#0EA5E9", background: "rgba(14, 165, 233, 0.1)" },
                }}
              >
                Restaurants
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleScrollToSection("list-section")}
                startIcon={<HotelIcon sx={{ color: "#10B981" }} />}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  py: 1.5,
                  borderRadius: "14px",
                  "&:hover": { borderColor: "#10B981", background: "rgba(16, 185, 129, 0.1)" },
                }}
              >
                Hotels
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleScrollToSection("list-section")}
                startIcon={<LocalActivityIcon sx={{ color: "#8B5CF6" }} />}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  py: 1.5,
                  borderRadius: "14px",
                  "&:hover": { borderColor: "#8B5CF6", background: "rgba(139, 92, 246, 0.1)" },
                }}
              >
                Attractions
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleScrollToSection("ai-section")}
                startIcon={<AutoAwesomeIcon />}
                sx={{
                  background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: 700,
                }}
              >
                AI Concierge
              </Button>
            </Grid>
          </Grid>

          {/* Stats Bar */}
          <Grid container spacing={3} maxWidth="850px">
            <Grid item xs={6} sm={3}>
              <StatBox>
                <Typography variant="h5" fontWeight={800} color="#0EA5E9">
                  50,000+
                </Typography>
                <Typography variant="caption" color="#94A3B8" fontWeight={500}>
                  Curated Spots
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatBox>
                <Typography variant="h5" fontWeight={800} color="#10B981">
                  190+
                </Typography>
                <Typography variant="caption" color="#94A3B8" fontWeight={500}>
                  Countries Covered
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatBox>
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                  <Typography variant="h5" fontWeight={800} color="#FFFFFF">
                    4.9
                  </Typography>
                  <StarIcon sx={{ color: "#F59E0B", fontSize: 22 }} />
                </Box>
                <Typography variant="caption" color="#94A3B8" fontWeight={500}>
                  Explorer Rating
                </Typography>
              </StatBox>
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatBox>
                <Typography variant="h5" fontWeight={800} color="#8B5CF6">
                  Instant
                </Typography>
                <Typography variant="caption" color="#94A3B8" fontWeight={500}>
                  AI Itineraries
                </Typography>
              </StatBox>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </HeroWrapper>
  );
};

export default Hero;
