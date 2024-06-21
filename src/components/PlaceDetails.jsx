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
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Card className={classes.card} elevation={6}>
      <CardMedia
        className={classes.media}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.travelxp.com/_next/image?url=https%3A%2F%2Fimages.travelxp.com%2Fimages%2Findia%2Fmandvi%2Fbastian.png&w=1920&q=75"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" className={classes.title}>
          <b>{place.name}</b>
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" className={classes.numReviews}>
            <Rating value={Number(place.rating)} readOnly /> &nbsp; [
            {place.num_reviews} reviews]
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            <b>Price: </b>
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            <b>Ranking: </b>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            key={award.display_name}
            display="flex"
            justifyContent="space-between"
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
              className={classes.chip}
            />
          ))}
        </Box>
        {place?.address ? (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> &nbsp; {place.address}
          </Typography>
        ) : (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> &nbsp; No address available
          </Typography>
        )}

        {place?.phone ? (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon />
            &nbsp; {place.phone}
          </Typography>
        ) : (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> &nbsp;No contact available
          </Typography>
        )}

        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            className={classes.button}
            startIcon={<TripOriginIcon />}
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            className={classes.button}
            startIcon={<LanguageIcon />}
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
          <IconButton onClick={handleFavoriteClick}>
            {isFavorited ? (
              <FavoriteIcon className={classes.favoriteIcon} />
            ) : (
              <FavoriteBorderIcon className={classes.favoriteIcon} />
            )}
          </IconButton>
          <IconButton onClick={() => alert("Share functionality coming soon!")}>
            <ShareIcon className={classes.shareIcon} />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    color: theme.palette.text.primary,
    overflow: "hidden",
  },
  media: {
    height: 350,
    borderRadius: "15px 15px 0 0",
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  chip: {
    margin: "5px 5px 5px 0",
    background: "linear-gradient(135deg, #f6a911 0%, #fda085 100%)",
    color: theme.palette.common.white,
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    background: "linear-gradient(135deg, #f37335 0%, #fda085 100%)",
    color: theme.palette.common.white,
    "&:hover": {
      background: "linear-gradient(135deg, #fda085 0%, #f37335 100%)",
    },
  },
  cardActions: {
    justifyContent: "space-between",
  },
  numReviews: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  details: {
    fontWeight: "bold",
  },
  favoriteIcon: {
    color: theme.palette.secondary.main,
  },
  shareIcon: {
    color: theme.palette.primary.main,
  },
}));

export default PlaceDetails;
