import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  MenuItem,
  Box,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlaceDetails from "./PlaceDetails";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/LocalActivity";
import GridOnIcon from "@mui/icons-material/GridOn";
import ListIcon from "@mui/icons-material/List";

const ContainerWrapper = styled("div")(({ theme }) => ({
  padding: "25px",
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

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  width: "100%",
});

const CustomTextField = styled(TextField)({
  flex: 1,
  margin: "8px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ff7e5f",
    },
    "&:hover fieldset": {
      borderColor: "#feb47b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff7e5f",
    },
  },
});

const IconContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const IconButtonStyled = styled(IconButton)(({ active }) => ({
  color: active ? "#ff7e5f" : "inherit",
  transition: "color 0.3s ease",
}));

const LoadingContainer = styled("div")({
  height: "600px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ListWrapper = styled(Grid)(({ theme }) => ({
  height: "75vh",
  overflow: "auto",
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <ContainerWrapper>
      <Title variant="h4">
        <b>Explore Dining, Accommodations, and Attractions Nearby</b>
      </Title>
      {isLoading ? (
        <LoadingContainer>
          <CircularProgress size="5rem" />
        </LoadingContainer>
      ) : (
        <>
          <FormContainer>
            <CustomTextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="restaurants">
                <RestaurantIcon style={{ marginRight: "8px" }} /> Restaurants
              </MenuItem>
              <MenuItem value="hotels">
                <HotelIcon style={{ marginRight: "8px" }} /> Accommodations
              </MenuItem>
              <MenuItem value="attractions">
                <AttractionsIcon style={{ marginRight: "8px" }} /> Attractions
              </MenuItem>
            </CustomTextField>

            <CustomTextField
              select
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              variant="outlined"
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0 ★</MenuItem>
              <MenuItem value={4}>Above 4.0 ★</MenuItem>
              <MenuItem value={4.5}>Above 4.5 ★</MenuItem>
            </CustomTextField>

            {!isMobile && (
              <IconContainer>
                <IconButtonStyled
                  onClick={() => handleLayoutChange("grid")}
                  active={layout === "grid"}
                >
                  <GridOnIcon />
                </IconButtonStyled>
                <IconButtonStyled
                  onClick={() => handleLayoutChange("list")}
                  active={layout === "list"}
                >
                  <ListIcon />
                </IconButtonStyled>
              </IconContainer>
            )}
          </FormContainer>

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
