import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Link as ScrollLink } from "react-scroll";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "hide",
})(({ theme, hide }) => ({
  background: "rgba(15, 23, 42, 0.88)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease-in-out",
  zIndex: theme.zIndex.drawer + 1,
  top: hide ? "-80px" : "0px",
}));

const LogoText = styled(Typography)({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 800,
  fontSize: "1.35rem",
  letterSpacing: "-0.02em",
  background: "linear-gradient(135deg, #FFFFFF 0%, #38BDF8 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const NavButton = styled(Button)({
  color: "#94A3B8",
  fontWeight: 600,
  fontSize: "0.9rem",
  borderRadius: "10px",
  padding: "6px 14px",
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});

const AiButton = styled(Button)({
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  borderRadius: "12px",
  padding: "8px 20px",
  background: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
  color: "#FFFFFF",
  boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #0284C7 0%, #1D4ED8 100%)",
    boxShadow: "0 6px 20px rgba(14, 165, 233, 0.4)",
  },
});

const Header = ({ savedCount = 0, onOpenSaved }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(currentScrollTop > lastScrollTop && currentScrollTop > 100 ? "down" : "up");
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleAiRecommendationClick = () => {
    const aiSection = document.getElementById("ai-section");
    if (aiSection) aiSection.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", to: "hero", icon: <HomeIcon /> },
    { label: "Interactive Map", to: "map-section", icon: <MapIcon /> },
    { label: "Weather", to: "weather-section", icon: <WbSunnyIcon /> },
    { label: "Explore Places", to: "list-section", icon: <RestaurantIcon /> },
  ];

  return (
    <StyledAppBar position="fixed" hide={scrollDirection === "down"}>
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5, px: { xs: 2, md: 4 } }}>
        {/* Brand Logo */}
        <Box display="flex" alignItems="center" gap={1.5} sx={{ cursor: "pointer" }}>
          <Avatar
            src="/logo.png"
            alt="TravelGenius Logo"
            sx={{ width: 40, height: 40, border: "2px solid rgba(14, 165, 233, 0.5)" }}
          />
          <LogoText variant="h6">TravelGenius</LogoText>
        </Box>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1}>
            {navItems.map((item) => (
              <ScrollLink key={item.label} to={item.to} smooth duration={500} offset={-70}>
                <NavButton startIcon={item.icon}>{item.label}</NavButton>
              </ScrollLink>
            ))}
          </Box>
        )}

        {/* Actions (Saved Wishlist + AI Assistant + Mobile Menu) */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton color="inherit" onClick={onOpenSaved} sx={{ color: "#F8FAFC" }}>
            <Badge badgeContent={savedCount} color="secondary">
              <BookmarkIcon />
            </Badge>
          </IconButton>

          {!isMobile && (
            <AiButton startIcon={<AutoAwesomeIcon />} onClick={handleAiRecommendationClick}>
              AI Planner
            </AiButton>
          )}

          {isMobile && (
            <IconButton color="inherit" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "#0F172A",
            color: "#FFFFFF",
            p: 2,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={700} color="#0EA5E9">
            TravelGenius
          </Typography>
          <IconButton color="inherit" onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ScrollLink
              key={item.label}
              to={item.to}
              smooth
              duration={500}
              offset={-70}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItem button sx={{ borderRadius: 2, mb: 1, color: "#94A3B8" }}>
                <ListItemIcon sx={{ color: "#0EA5E9", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
            </ScrollLink>
          ))}
        </List>

        <Box mt={3}>
          <AiButton
            fullWidth
            startIcon={<AutoAwesomeIcon />}
            onClick={() => {
              setMobileMenuOpen(false);
              handleAiRecommendationClick();
            }}
          >
            AI Trip Planner
          </AiButton>
        </Box>
      </Drawer>
    </StyledAppBar>
  );
};

export default Header;
