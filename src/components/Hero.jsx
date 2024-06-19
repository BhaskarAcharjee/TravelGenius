import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";

const Hero = () => {
  const classes = useStyles();

  const handleExploreClick = () => {
    // Example: Smooth scroll to the main content section
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={classes.landingSection}>
      <Container maxWidth="lg" className={classes.landingContent}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <ExploreIcon className={classes.landingIcon} />
          <Typography variant="h2" className={classes.landingTitle}>
            Discover Your Next Adventure
          </Typography>
          <Typography variant="h5" className={classes.landingSubtitle}>
            Find the best places to eat, stay, and explore near you.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.landingButton}
            onClick={handleExploreClick}
          >
            Explore Now
          </Button>
        </Box>
      </Container>
    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  landingSection: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: theme.palette.common.white,
    position: "relative", // Ensure relative positioning for z-index layering
    marginBottom: "20px",
  },
  landingContent: {
    textAlign: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  landingIcon: {
    fontSize: "6rem",
    marginBottom: theme.spacing(2),
    color: theme.palette.common.white,
    animation: `$fadeIn 2s ${theme.transitions.easing.easeInOut}`,
  },
  landingTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    animation: `$fadeIn 2.5s ${theme.transitions.easing.easeInOut}`,
  },
  landingSubtitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    animation: `$fadeIn 3s ${theme.transitions.easing.easeInOut}`,
  },
  landingButton: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    backgroundColor: "#ff7e5f",
    "&:hover": { backgroundColor: "#feb47b" },
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
}));

export default Hero;
