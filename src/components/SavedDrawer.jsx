import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LaunchIcon from "@mui/icons-material/Launch";

const SavedDrawer = ({ open, onClose, savedPlaces = [], onRemoveItem, onClearAll }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          background: "#F8FAFC",
          p: 3,
        },
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ bgcolor: "#0EA5E9" }}>
            <BookmarkIcon />
          </Avatar>
          <div>
            <Typography variant="h6" fontWeight={700}>
              Saved Wishlist
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {savedPlaces.length} {savedPlaces.length === 1 ? "destination" : "destinations"} saved
            </Typography>
          </div>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Content */}
      {savedPlaces.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="60%"
          textAlign="center"
          gap={1.5}
        >
          <BookmarkIcon sx={{ fontSize: 64, color: "#CBD5E1" }} />
          <Typography variant="h6" fontWeight={600} color="textSecondary">
            Your wishlist is empty
          </Typography>
          <Typography variant="body2" color="textSecondary" maxWidth={260}>
            Click the heart icon on any restaurant, hotel, or attraction to save it here for quick access.
          </Typography>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" fontWeight={600} color="textSecondary">
              Your Bookmarks
            </Typography>
            <Button
              size="small"
              color="error"
              onClick={onClearAll}
              startIcon={<DeleteOutlineIcon />}
              sx={{ fontSize: "0.8rem" }}
            >
              Clear All
            </Button>
          </Box>

          <List sx={{ flexGrow: 1, overflowY: "auto", py: 0 }}>
            {savedPlaces.map((place, index) => (
              <React.Fragment key={place.name + index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: 3,
                    mb: 1.5,
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                    flexDirection: "column",
                    p: 2,
                  }}
                >
                  <Box display="flex" width="100%" gap={2} alignItems="center" mb={1}>
                    <ListItemAvatar sx={{ minWidth: "auto" }}>
                      <Avatar
                        variant="rounded"
                        src={
                          place.photo?.images?.large?.url ||
                          "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80"
                        }
                        alt={place.name}
                        sx={{ width: 64, height: 64, borderRadius: 2 }}
                      />
                    </ListItemAvatar>
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                        {place.name}
                      </Typography>
                      {place.rating && (
                        <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                          <Rating value={Number(place.rating)} readOnly precision={0.5} size="small" />
                          <Typography variant="caption" fontWeight={600} color="textSecondary">
                            ({place.rating})
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <IconButton size="small" color="error" onClick={() => onRemoveItem(place)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {place.address && (
                    <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="textSecondary" noWrap>
                        {place.address}
                      </Typography>
                    </Box>
                  )}

                  <Box display="flex" gap={1} width="100%" mt={0.5}>
                    {place.web_url && (
                      <Button
                        size="small"
                        variant="outlined"
                        fullWidth
                        startIcon={<LaunchIcon />}
                        onClick={() => window.open(place.web_url, "_blank")}
                        sx={{ borderRadius: 2, fontSize: "0.75rem", py: 0.5 }}
                      >
                        TripAdvisor
                      </Button>
                    )}
                    {place.website && (
                      <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        startIcon={<LaunchIcon />}
                        onClick={() => window.open(place.website, "_blank")}
                        sx={{ borderRadius: 2, fontSize: "0.75rem", py: 0.5 }}
                      >
                        Official Site
                      </Button>
                    )}
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </Drawer>
  );
};

export default SavedDrawer;
