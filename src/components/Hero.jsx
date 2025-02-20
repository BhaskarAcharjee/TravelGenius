import React from "react";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { styled, keyframes } from "@mui/material/styles";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const HeroSection = styled("section")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
  color: theme.palette.common.white,
  position: "relative",
  marginBottom: "20px",
}));

const LandingContent = styled(Container)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const LandingIcon = styled(ExploreIcon)(({ theme }) => ({
  fontSize: "6rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  animation: `${fadeIn} 2s ${theme.transitions.easing.easeInOut}`,
}));

const LandingTitle = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  marginBottom: "32px",
  animation: `${fadeIn} 2.5s ease-in-out`,
});

const LandingSubtitle = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 400,
  marginBottom: "32px",
  animation: `${fadeIn} 3s ease-in-out`,
});

const LandingButton = styled(Button)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  borderRadius: "24px",
  padding: "12px 32px",
  marginTop: "24px",
  backgroundColor: "#ff7e5f",
  "&:hover": { backgroundColor: "#feb47b" },
  animation: `${fadeIn} 3.5s ease-in-out`,
});

const CategoryItem = styled(Grid)({
  textAlign: "center",
  animation: `${fadeIn} 4s ease-in-out`,
});

const CategoryIcon = styled("div")(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(1),
  color: theme.palette.common.white,
}));

const CategoryTitle = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  marginBottom: "8px",
  color: "#fff",
});

const CategoryText = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 400,
  color: "#fff",
});

const Hero = () => {
  const handleExploreClick = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroSection id="hero">
      <LandingContent maxWidth="lg">
        <Box display="flex" alignItems="center" flexDirection="column">
          <LandingIcon />
          <LandingTitle variant="h2">Discover Your Next Adventure</LandingTitle>
          <LandingSubtitle variant="h5">
            Find the best places to eat, stay, and explore near you, now with AI-powered recommendations.
          </LandingSubtitle>
          <Grid container spacing={4} justifyContent="center">
            <CategoryItem item xs={12} sm={4}>
              <RestaurantIcon className="category-icon" />
              <CategoryTitle variant="h6">Restaurants</CategoryTitle>
              <CategoryText variant="body1">
                Discover the best dining experiences, from local favorites to top-rated eateries.
              </CategoryText>
            </CategoryItem>
            <CategoryItem item xs={12} sm={4}>
              <HotelIcon className="category-icon" />
              <CategoryTitle variant="h6">Hotels</CategoryTitle>
              <CategoryText variant="body1">
                Find the perfect place to stay, with options ranging from budget to luxury.
              </CategoryText>
            </CategoryItem>
            <CategoryItem item xs={12} sm={4}>
              <LocalActivityIcon className="category-icon" />
              <CategoryTitle variant="h6">Attractions</CategoryTitle>
              <CategoryText variant="body1">
                Explore popular attractions and hidden gems that make your trip memorable.
              </CategoryText>
            </CategoryItem>
            <CategoryItem item xs={12} sm={4}>
              <EmojiObjectsIcon className="category-icon" />
              <CategoryTitle variant="h6">AI Recommendations</CategoryTitle>
              <CategoryText variant="body1">
                Get personalized suggestions powered by AI to make your trip even more special.
              </CategoryText>
            </CategoryItem>
          </Grid>
          <LandingButton variant="contained" onClick={handleExploreClick}>
            Explore Now
          </LandingButton>
        </Box>
      </LandingContent>
    </HeroSection>
  );
};

export default Hero;
