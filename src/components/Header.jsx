import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { styled, alpha } from "@mui/material/styles"; // ✅ Correct import
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(currentScrollTop > lastScrollTop ? "down" : "up");
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleAiRecommendationClick = () => {
    const aiSection = document.getElementById("ai-section");
    if (aiSection) aiSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StyledAppBar position="fixed" hide={scrollDirection === "down"}>
      <Toolbar>
        <LogoContainer>
          <Avatar src="/logo.png" alt="Travel Genius Logo" />
          <Typography
            variant="h5"
            sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Travel Genius
          </Typography>
        </LogoContainer>
        <NavLinks>
          <ScrollLink to="hero" smooth duration={500}>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </ScrollLink>
          <ScrollLink to="map" smooth duration={500}>
            <IconButton color="inherit">
              <MapIcon />
            </IconButton>
          </ScrollLink>
          <ScrollLink to="list-content" smooth duration={500}>
            <IconButton color="inherit">
              <RestaurantIcon />
            </IconButton>
          </ScrollLink>
        </NavLinks>
        {!isMobile && (
          <AiButton onClick={handleAiRecommendationClick}>
            Get AI Recommendation
          </AiButton>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "hide", // Prevent `hide` from being passed as an attribute
})(({ theme, hide }) => ({
  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
  boxShadow: "none",
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  transition: "top 0.3s",
  zIndex: theme.zIndex.drawer + 1,
  top: hide ? "-72px" : "0px", // Apply CSS conditionally
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const NavLinks = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const AiButton = styled(Button)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  borderRadius: "24px",
  padding: "12px 32px",
  marginLeft: "16px",
  backgroundColor: "#ff7e5f",
  "&:hover": { backgroundColor: "#feb47b" },
});

export default Header;
