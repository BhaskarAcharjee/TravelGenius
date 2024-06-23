import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Link, Grid } from "@material-ui/core";
import { Twitter, LinkedIn, GitHub, Language } from "@material-ui/icons";

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Link
              href="https://bhaskaracharjee.vercel.app/"
              color="inherit"
              target="_blank"
            >
              <Language className={classes.icon} />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://twitter.com/_bha_s_kar_"
              color="inherit"
              target="_blank"
            >
              <Twitter className={classes.icon} />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.linkedin.com/in/bhaskar-acharjee/"
              color="inherit"
              target="_blank"
            >
              <LinkedIn className={classes.icon} />
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://github.com/BhaskarAcharjee"
              color="inherit"
              target="_blank"
            >
              <GitHub className={classes.icon} />
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className={classes.text}
        >
          &copy;
          {/* {new Date().getFullYear()}  */}
          2024 Travel Genius. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    marginTop: "auto",
    borderTop: `1px solid ${theme.palette.divider}`,
    boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    fontSize: 30,
    color: theme.palette.text.primary,
    "&:hover": {
      color: "#ff7e5f",
    },
  },
  text: {
    marginTop: theme.spacing(2),
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
  },
}));

export default Footer;
