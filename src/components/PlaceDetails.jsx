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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/material/styles";

// Styled Components (Replaces makeStyles)
const CardStyled = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  color: theme.palette.text.primary,
  overflow: "hidden",
}));

const MediaStyled = styled(CardMedia)({
  height: 350,
  borderRadius: "15px 15px 0 0",
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #f37335 0%, #fda085 100%)",
  color: theme.palette.common.white,
  "&:hover": {
    background: "linear-gradient(135deg, #fda085 0%, #f37335 100%)",
  },
}));

const FavoriteIconStyled = styled(FavoriteIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const FavoriteBorderIconStyled = styled(FavoriteBorderIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const PlaceDetails = ({ place, selected, refProp }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <CardStyled elevation={6}>
      <MediaStyled
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.travelxp.com/_next/image?url=https%3A%2F%2Fimages.travelxp.com%2Fimages%2Findia%2Fmandvi%2Fbastian.png&w=1920&q=75"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          <b>{place.name}</b>
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            <Rating value={Number(place.rating)} readOnly /> &nbsp; [
            {place.num_reviews} reviews]
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            <b>Price: </b> {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            <b>Ranking: </b> {place.ranking}
          </Typography>
        </Box>

        {place?.awards?.map((award) => (
          <Box
            key={award.display_name}
            display="flex"
            alignItems="center"
            my={1}
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        <Box display="flex" flexWrap="wrap" my={1}>
          {place?.cuisine?.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              sx={{ margin: "5px 5px 5px 0" }}
            />
          ))}
        </Box>

        {place?.address ? (
          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <LocationOnIcon /> &nbsp; {place.address}
          </Typography>
        ) : (
          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <LocationOnIcon /> &nbsp; No address available
          </Typography>
        )}

        {place?.phone ? (
          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <PhoneIcon /> &nbsp; {place.phone}
          </Typography>
        ) : (
          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <PhoneIcon /> &nbsp; No contact available
          </Typography>
        )}

        <CardActions sx={{ justifyContent: "space-between" }}>
          <ButtonStyled
            size="small"
            startIcon={<TripOriginIcon />}
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </ButtonStyled>
          <ButtonStyled
            size="small"
            startIcon={<LanguageIcon />}
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </ButtonStyled>
          <IconButton onClick={handleFavoriteClick}>
            {isFavorited ? (
              <FavoriteIconStyled />
            ) : (
              <FavoriteBorderIconStyled />
            )}
          </IconButton>
          <IconButton onClick={() => alert("Share functionality coming soon!")}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </CardStyled>
  );
};

export default PlaceDetails;
