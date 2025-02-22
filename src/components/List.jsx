import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlaceDetails from "./PlaceDetails";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/LocalActivity";
import GridOnIcon from "@mui/icons-material/GridOn";
import ListIcon from "@mui/icons-material/List";
import FilterListIcon from "@mui/icons-material/FilterList";

const ContainerWrapper = styled("div")(({ theme }) => ({
  padding: "20px",
  backgroundColor: "#f0f2f5",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginTop: "20px",
  marginBottom: "20px",
}));

const Title = styled(Typography)({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "10px",
});

const ControlsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  flexWrap: "wrap",
  gap: "10px",
});

const CategoryButton = styled(Button)(({ selected }) => ({
  padding: "8px 16px",
  borderRadius: "20px",
  textTransform: "none",
  fontWeight: selected ? "bold" : "normal",
  background: selected
    ? "linear-gradient(to right, #ff7e5f, #feb47b)"
    : "transparent",
  color: selected ? "#fff" : "#000",
  border: selected ? "none" : "1px solid #ff7e5f",
  "&:hover": {
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff",
  },
}));

const ListWrapper = styled(Grid)(({ theme }) => ({
  height: "75vh",
  overflowY: "auto",
  // backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  marginTop: "8px",
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
}));

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const [elRefs, setElRefs] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  return (
    <ContainerWrapper>
      <Title variant="h4">
        <b>Explore Dining, Accommodations, and Attractions Nearby</b>
      </Title>
      {isLoading ? (
        <Box
          height="600px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <ControlsContainer>
            {/* Category Selection */}
            <Box display="flex" gap={1}>
              <CategoryButton
                selected={type === "restaurants"}
                onClick={() => setType("restaurants")}
                startIcon={<RestaurantIcon />}
              >
                Restaurants
              </CategoryButton>
              <CategoryButton
                selected={type === "hotels"}
                onClick={() => setType("hotels")}
                startIcon={<HotelIcon />}
              >
                Accommodations
              </CategoryButton>
              <CategoryButton
                selected={type === "attractions"}
                onClick={() => setType("attractions")}
                startIcon={<AttractionsIcon />}
              >
                Attractions
              </CategoryButton>
            </Box>

            {/* Right-Side Icons */}
            <Box display="flex" alignItems="center">
              {/* Rating Filter */}
              <IconButton onClick={handleFilterClick}>
                <FilterListIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={() => setRating(0)}>All</MenuItem>
                <MenuItem onClick={() => setRating(3)}>Above 3.0 ★</MenuItem>
                <MenuItem onClick={() => setRating(4)}>Above 4.0 ★</MenuItem>
                <MenuItem onClick={() => setRating(4.5)}>Above 4.5 ★</MenuItem>
              </Menu>

              {/* View Mode Toggle */}
              <IconButton onClick={() => handleLayoutChange("grid")}>
                <GridOnIcon color={layout === "grid" ? "primary" : "inherit"} />
              </IconButton>
              <IconButton onClick={() => handleLayoutChange("list")}>
                <ListIcon color={layout === "list" ? "primary" : "inherit"} />
              </IconButton>
            </Box>
          </ControlsContainer>

          {/* List/Grid View */}
          <ListWrapper container spacing={3}>
            {places?.map((place, i) => (
              <Grid
                ref={elRefs[i]}
                item
                key={i}
                xs={12}
                sm={layout === "grid" ? 6 : 12}
                md={layout === "grid" ? 4 : 12}
              >
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </ListWrapper>
        </>
      )}
    </ContainerWrapper>
  );
};

export default List;
