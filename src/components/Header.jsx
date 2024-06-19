import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box, Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import MapIcon from "@material-ui/icons/Map";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Link as ScrollLink } from "react-scroll";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
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

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    } else {
      console.error("Place has no geometry information");
    }
  };

  return (
    <AppBar position="fixed" className={`${classes.appBar} ${scrollDirection === "down" ? classes.appBarHidden : ""}`}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <Avatar src="/logo.png" alt="Travel Genius Logo" className={classes.logo} />
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
        <Box display="flex" alignItems="center">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Explore New Places..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  subtitle: {
    fontFamily: "'Poppins', sans-serif", // Modern font
    fontWeight: 400,
    color: alpha(theme.palette.common.white, 0.85),
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.35) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: alpha(theme.palette.common.white, 0.75),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: alpha(theme.palette.common.black, 0.75),
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1),
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
}));

export default Header;
