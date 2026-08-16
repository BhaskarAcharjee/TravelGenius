import React, { useState, useEffect, createRef } from "react";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  MenuItem,
  Menu,
  InputBase,
  Paper,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlaceDetails from "./PlaceDetails";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewListIcon from "@mui/icons-material/ViewList";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";

const SectionWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ControlsCard = styled(Paper)(({ theme }) => ({
  padding: "16px 24px",
  borderRadius: "20px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E2E8F0",
  boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
  marginBottom: "24px",
}));

const CategoryPill = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ selected }) => ({
  borderRadius: "12px",
  padding: "8px 20px",
  fontWeight: 700,
  fontSize: "0.9rem",
  background: selected
    ? "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)"
    : "#F1F5F9",
  color: selected ? "#FFFFFF" : "#475569",
  boxShadow: selected ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "none",
  "&:hover": {
    background: selected
      ? "linear-gradient(135deg, #0284C7 0%, #1D4ED8 100%)"
      : "#E2E8F0",
  },
}));

const SearchBar = styled(Paper)({
  display: "flex",
  alignItems: "center",
  padding: "4px 12px",
  borderRadius: "12px",
  backgroundColor: "#F8FAFC",
  border: "1px solid #E2E8F0",
  boxShadow: "none",
  width: "240px",
});

const List = ({
  places = [],
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
  savedPlaces = [],
  onToggleSave,
}) => {
  const [elRefs, setElRefs] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    setElRefs((prevRefs) =>
      Array(places?.length || 0)
        .fill()
        .map((_, i) => prevRefs[i] || createRef())
    );
  }, [places]);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const filteredPlaces = places.filter((place) => {
    if (!searchKeyword) return true;
    return (
      place.name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      place.address?.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <SectionWrapper id="list-section">
      <Box mb={3}>
        <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em" gutterBottom>
          Handpicked <span className="gradient-text-primary">Destinations & Dining</span>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Browse top-rated venues near your selected coordinates or filter by rating and category.
        </Typography>
      </Box>

      {/* Filter Controls Card */}
      <ControlsCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          {/* Category Tabs */}
          <Box display="flex" gap={1.5} flexWrap="wrap">
            <CategoryPill
              selected={type === "restaurants"}
              onClick={() => setType("restaurants")}
              startIcon={<RestaurantIcon />}
            >
              Restaurants
            </CategoryPill>
            <CategoryPill
              selected={type === "hotels"}
              onClick={() => setType("hotels")}
              startIcon={<HotelIcon />}
            >
              Hotels & Resorts
            </CategoryPill>
            <CategoryPill
              selected={type === "attractions"}
              onClick={() => setType("attractions")}
              startIcon={<LocalActivityIcon />}
            >
              Attractions
            </CategoryPill>
          </Box>

          {/* Search Keyword & View Switcher */}
          <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
            <SearchBar>
              <SearchIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
              <InputBase
                placeholder="Filter by name..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                sx={{ fontSize: "0.875rem", fontFamily: "'Inter', sans-serif" }}
              />
            </SearchBar>

            {/* Rating Filter Menu */}
            <Button
              size="small"
              onClick={handleFilterClick}
              startIcon={<FilterListIcon />}
              endIcon={<StarIcon sx={{ color: "#F59E0B" }} />}
              sx={{ borderRadius: "12px", border: "1px solid #E2E8F0", px: 2, color: "#0F172A" }}
            >
              {rating > 0 ? `${rating}★ & up` : "All Ratings"}
            </Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
              <MenuItem onClick={() => { setRating(0); handleFilterClose(); }}>All Ratings</MenuItem>
              <MenuItem onClick={() => { setRating(3); handleFilterClose(); }}>Above 3.0 ★</MenuItem>
              <MenuItem onClick={() => { setRating(4); handleFilterClose(); }}>Above 4.0 ★</MenuItem>
              <MenuItem onClick={() => { setRating(4.5); handleFilterClose(); }}>Above 4.5 ★</MenuItem>
            </Menu>

            {/* View Mode Toggle */}
            <IconButton onClick={() => setLayout("grid")} color={layout === "grid" ? "primary" : "default"}>
              <GridOnIcon />
            </IconButton>
            <IconButton onClick={() => setLayout("list")} color={layout === "list" ? "primary" : "default"}>
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>
      </ControlsCard>

      {/* Grid or List View */}
      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <Grid item xs={12} sm={layout === "grid" ? 6 : 12} md={layout === "grid" ? 4 : 12} key={key}>
              <Skeleton variant="rounded" height={320} sx={{ borderRadius: 4 }} />
              <Box pt={1}>
                <Skeleton width="60%" height={28} />
                <Skeleton width="40%" height={20} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : filteredPlaces.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: "center", borderRadius: 4, bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <Typography variant="h6" fontWeight={700} color="textSecondary" gutterBottom>
            No destinations found matching your criteria.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search filter or clearing the rating filter.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPlaces.map((place, i) => {
            const isSaved = savedPlaces.some((item) => item.name === place.name);
            return (
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
                  isSaved={isSaved}
                  onToggleSave={onToggleSave}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </SectionWrapper>
  );
};

export default List;
