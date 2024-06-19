import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlaceDetails from "./PlaceDetails";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Explore Dining, Accommodations, and Attractions Nearby
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                displayEmpty
                className={classes.select}
              >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Accomodations</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                displayEmpty
                className={classes.select}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0 ★</MenuItem>
                <MenuItem value={4}>Above 4.0 ★</MenuItem>
                <MenuItem value={4.5}>Above 4.5 ★</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12} sm={6} md={4}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  select: {
    padding: theme.spacing(1.5, 2),
    color: theme.palette.text.primary,
    "&:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.5, 2),
    },
    "& .MuiSelect-icon": {
      color: theme.palette.text.primary,
    },
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
    backgroundColor: "#f0f2f5",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    marginBottom: "20px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ff7e5f",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "4px",
    },
  },
}));

export default List;
