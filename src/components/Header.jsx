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
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MapIcon from "@material-ui/icons/Map";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const classes = useStyles();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleAiRecommendationClick = () => {
    const aiSection = document.getElementById("ai-section");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="fixed"
      className={`${classes.appBar} ${
        scrollDirection === "down" ? classes.appBarHidden : ""
      }`}
    >
      <Toolbar className={classes.toolbar}>
        <Box
          display="flex"
          alignItems="center"
          className={classes.logoContainer}
        >
          <Avatar
            src="/logo.png"
            alt="Travel Genius Logo"
            className={classes.logo}
          />
          <Typography variant="h5" className={classes.title}>
            Travel Genius
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className={classes.navLinks}>
          <ScrollLink to="hero" smooth={true} duration={500}>
            <IconButton color="inherit" aria-label="home">
              <HomeIcon />
            </IconButton>
          </ScrollLink>
          <ScrollLink to="map" smooth={true} duration={500}>
            <IconButton color="inherit" aria-label="map">
              <MapIcon />
            </IconButton>
          </ScrollLink>
          <ScrollLink to="list-content" smooth={true} duration={500}>
            <IconButton color="inherit" aria-label="restaurants">
              <RestaurantIcon />
            </IconButton>
          </ScrollLink>
        </Box>
        {!isMobile && (
          <Button
            variant="contained"
            color="primary"
            className={classes.aiButton}
            onClick={handleAiRecommendationClick}
          >
            Get AI Recommendation
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient background
    boxShadow: "none", // Remove default shadow
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`, // Add a subtle border at the bottom
    transition: "top 0.3s", // Smooth transition for showing/hiding header
    zIndex: theme.zIndex.drawer + 1, // Ensure it's above drawer if present
  },
  appBarHidden: {
    top: "-72px", // Adjust based on your header height
  },
  title: {
    fontFamily: "'Poppins', sans-serif", // Modern font
    fontWeight: 600,
    marginLeft: theme.spacing(1),
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  },
  navLinks: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  aiButton: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    marginLeft: theme.spacing(2),
    backgroundColor: "#ff7e5f",
    "&:hover": { backgroundColor: "#feb47b" },
  },
  logo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

export default Header;
