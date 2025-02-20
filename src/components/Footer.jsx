import React from "react";
import { Container, Typography, Link, Grid } from "@mui/material";
import { Twitter, LinkedIn, GitHub, Language } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const FooterWrapper = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
  marginTop: "auto",
  borderTop: `1px solid ${theme.palette.divider}`,
  boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
}));

const IconLink = styled(Link)(({ theme }) => ({
  fontSize: 30,
  color: theme.palette.text.primary,
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ff7e5f",
  },
}));

const FooterText = styled(Typography)({
  marginTop: "16px",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <IconLink
              href="https://bhaskaracharjee.vercel.app/"
              target="_blank"
            >
              <Language fontSize="large" />
            </IconLink>
          </Grid>
          <Grid item>
            <IconLink href="https://twitter.com/_bha_s_kar_" target="_blank">
              <Twitter fontSize="large" />
            </IconLink>
          </Grid>
          <Grid item>
            <IconLink
              href="https://www.linkedin.com/in/bhaskar-acharjee/"
              target="_blank"
            >
              <LinkedIn fontSize="large" />
            </IconLink>
          </Grid>
          <Grid item>
            <IconLink href="https://github.com/BhaskarAcharjee" target="_blank">
              <GitHub fontSize="large" />
            </IconLink>
          </Grid>
        </Grid>
        <FooterText variant="body2" color="textSecondary">
          &copy; 2024 Travel Genius. All rights reserved.
        </FooterText>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
