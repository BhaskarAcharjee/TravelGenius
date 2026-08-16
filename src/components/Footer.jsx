import React, { useState } from "react";
import {
  Container,
  Typography,
  Link,
  Grid,
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Twitter, LinkedIn, GitHub, Language } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import { Link as ScrollLink } from "react-scroll";

const FooterWrapper = styled("footer")({
  backgroundColor: "#0F172A",
  color: "#94A3B8",
  paddingTop: "64px",
  paddingBottom: "32px",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
});

const SocialIconButton = styled(IconButton)({
  color: "#94A3B8",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#0EA5E9",
    transform: "translateY(-3px)",
  },
});

const Footer = () => {
  const [email, setEmail] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setToastOpen(true);
      setEmail("");
    }
  };

  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={5} mb={6}>
          {/* Column 1: Brand & Tagline */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Avatar
                src="/logo.png"
                alt="TravelGenius Logo"
                sx={{ width: 44, height: 44, border: "2px solid #0EA5E9" }}
              />
              <Typography variant="h5" fontWeight={800} color="#FFFFFF" letterSpacing="-0.02em">
                TravelGenius
              </Typography>
            </Box>
            <Typography variant="body2" lineHeight={1.7} mb={3}>
              Next-generation AI travel platform providing handpicked restaurants, luxury accommodations, tourist attractions, and real-time weather worldwide.
            </Typography>
            <Box display="flex" gap={1}>
              <SocialIconButton href="https://bhaskaracharjee.vercel.app/" target="_blank">
                <Language fontSize="small" />
              </SocialIconButton>
              <SocialIconButton href="https://github.com/BhaskarAcharjee" target="_blank">
                <GitHub fontSize="small" />
              </SocialIconButton>
              <SocialIconButton href="https://www.linkedin.com/in/bhaskar-acharjee/" target="_blank">
                <LinkedIn fontSize="small" />
              </SocialIconButton>
              <SocialIconButton href="https://twitter.com/_bha_s_kar_" target="_blank">
                <Twitter fontSize="small" />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Column 2: Quick Navigation */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" mb={2}>
              Quick Navigation
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.2}>
              {[
                { label: "Home", to: "hero" },
                { label: "Interactive Map", to: "map-section" },
                { label: "Live Weather", to: "weather-section" },
                { label: "Explore Places", to: "list-section" },
                { label: "AI Trip Concierge", to: "ai-section" },
              ].map((link) => (
                <ScrollLink key={link.label} to={link.to} smooth duration={500} offset={-70}>
                  <Link
                    underline="hover"
                    sx={{
                      color: "#94A3B8",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      "&:hover": { color: "#0EA5E9" },
                    }}
                  >
                    {link.label}
                  </Link>
                </ScrollLink>
              ))}
            </Box>
          </Grid>

          {/* Column 3: Travel Categories */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" mb={2}>
              Categories
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.2}>
              {["Michelin Dining", "Boutique Hotels", "Tourist Attractions", "AI Itineraries", "Saved Wishlist"].map(
                (item) => (
                  <Typography key={item} variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#0EA5E9" } }}>
                    {item}
                  </Typography>
                )
              )}
            </Box>
          </Grid>

          {/* Column 4: Newsletter Subscription */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" mb={1}>
              Join TravelGenius Insider
            </Typography>
            <Typography variant="body2" mb={2}>
              Get exclusive secret travel guides and AI itinerary updates straight to your inbox.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} display="flex" gap={1}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  input: { color: "#FFF", fontSize: "0.85rem" },
                  "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
                  minWidth: "auto",
                  px: 2,
                }}
              >
                <SendIcon fontSize="small" />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 3 }} />

        {/* Copyright */}
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography variant="body2" color="#64748B">
            © {new Date().getFullYear()} TravelGenius. All rights reserved.
          </Typography>
          <Typography variant="body2" color="#64748B" display="flex" alignItems="center" gap={0.5}>
            Crafted with <FavoriteIcon sx={{ color: "#EF4444", fontSize: 16 }} /> by{" "}
            <Link
              href="https://bhaskaracharjee.vercel.app/"
              target="_blank"
              underline="none"
              sx={{ color: "#38BDF8", fontWeight: 600 }}
            >
              Bhaskar Acharjee
            </Link>
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setToastOpen(false)} sx={{ borderRadius: 3 }}>
          Thank you for subscribing to TravelGenius Insider!
        </Alert>
      </Snackbar>
    </FooterWrapper>
  );
};

export default Footer;
