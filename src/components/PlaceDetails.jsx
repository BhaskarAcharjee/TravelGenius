import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Rating,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  borderRadius: "20px",
  backgroundColor: "#FFFFFF",
  border: selected ? "2px solid #0EA5E9" : "1px solid #E2E8F0",
  boxShadow: selected
    ? "0 12px 30px rgba(14, 165, 233, 0.2)"
    : "0 4px 20px rgba(15, 23, 42, 0.04)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.1)",
  },
}));

const PriceBadge = styled(Box)({
  position: "absolute",
  top: "16px",
  right: "16px",
  backgroundColor: "rgba(15, 23, 42, 0.85)",
  backdropFilter: "blur(8px)",
  color: "#38BDF8",
  padding: "4px 12px",
  borderRadius: "20px",
  fontWeight: 700,
  fontSize: "0.8rem",
});

const PlaceDetails = ({ place, selected, refProp, isSaved, onToggleSave }) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (selected && refProp?.current) {
    refProp.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80";

  const imageUrl = place.photo?.images?.large?.url || defaultImage;

  const handleShareClick = async () => {
    const shareData = {
      title: place.name,
      text: `Check out ${place.name} on TravelGenius!`,
      url: place.website || place.web_url || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or ignored
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      setToastMessage("Link copied to clipboard!");
      setToastOpen(true);
    }
  };

  const handleBookmarkToggle = () => {
    if (onToggleSave) {
      onToggleSave(place);
    }
  };

  return (
    <>
      <StyledCard selected={selected}>
        {/* Media Header */}
        <Box position="relative">
          <CardMedia component="img" height="220" image={imageUrl} alt={place.name} />
          {place.price_level && <PriceBadge>{place.price_level}</PriceBadge>}
        </Box>

        {/* Card Content */}
        <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" fontWeight={700} gutterBottom lineHeight={1.3}>
            {place.name}
          </Typography>

          {/* Rating & Reviews */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Rating value={Number(place.rating) || 4.5} readOnly precision={0.5} size="small" />
            <Typography variant="body2" fontWeight={700} color="#0F172A">
              {place.rating || "4.8"}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ({place.num_reviews || 120} reviews)
            </Typography>
          </Box>

          {/* Ranking */}
          {place.ranking && (
            <Typography variant="caption" color="textSecondary" sx={{ mb: 1.5, display: "block" }}>
              🏆 {place.ranking}
            </Typography>
          )}

          {/* Awards */}
          {place.awards?.map((award, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <EmojiEventsIcon sx={{ color: "#F59E0B", fontSize: 18 }} />
              <Typography variant="caption" fontWeight={600} color="#475569">
                {award.display_name}
              </Typography>
            </Box>
          ))}

          {/* Cuisine / Category Chips */}
          <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
            {place.cuisine?.map(({ name }) => (
              <Chip key={name} size="small" label={name} sx={{ fontSize: "0.75rem", bgcolor: "#F1F5F9" }} />
            ))}
          </Box>

          <Box mt="auto">
            {/* Address */}
            {place.address && (
              <Box display="flex" alignItems="flex-start" gap={1} mb={0.8}>
                <LocationOnIcon sx={{ color: "#0EA5E9", fontSize: 18, mt: 0.2 }} />
                <Typography variant="caption" color="textSecondary" lineHeight={1.4}>
                  {place.address}
                </Typography>
              </Box>
            )}

            {/* Phone */}
            {place.phone && (
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon sx={{ color: "#10B981", fontSize: 18 }} />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="a"
                  href={`tel:${place.phone}`}
                  sx={{ textDecoration: "none", "&:hover": { color: "#0EA5E9" } }}
                >
                  {place.phone}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>

        {/* Card Actions Footer */}
        <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #F1F5F9" }}>
          <Box display="flex" gap={1}>
            {place.web_url && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<TripOriginIcon />}
                onClick={() => window.open(place.web_url, "_blank")}
                sx={{ borderRadius: "10px", fontSize: "0.75rem", py: 0.5 }}
              >
                Advisor
              </Button>
            )}
            {place.website && (
              <Button
                size="small"
                variant="contained"
                startIcon={<LanguageIcon />}
                onClick={() => window.open(place.website, "_blank")}
                sx={{ borderRadius: "10px", fontSize: "0.75rem", py: 0.5 }}
              >
                Website
              </Button>
            )}
          </Box>

          <Box display="flex" alignItems="center">
            <Tooltip title={isSaved ? "Remove from Saved" : "Save Destination"}>
              <IconButton onClick={handleBookmarkToggle} size="small" sx={{ color: isSaved ? "#EF4444" : "#94A3B8" }}>
                {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Share">
              <IconButton onClick={handleShareClick} size="small" sx={{ color: "#94A3B8" }}>
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </StyledCard>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: "100%", borderRadius: 3 }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlaceDetails;
