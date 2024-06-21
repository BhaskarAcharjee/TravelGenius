import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Paper, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: "#f0f2f5",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  outputBox: {
    padding: theme.spacing(2),
    minHeight: "200px",
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    alignSelf: "flex-start",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(to right, #feb47b, #ff7e5f)",
    },
  },
}));

const AskAI = () => {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate AI response
    setResponse(`AI Recommendation for ${city} for ${days} days with a ${budget} budget and feeling ${mood} [yet to implement].`);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom><b>Ask AI for Recommendations</b></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Which City?"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="For How Many Days?"
              variant="outlined"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Budget"
              variant="outlined"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              fullWidth
              select
              required
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
            <TextField
              label="Mood"
              variant="outlined"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" className={classes.button}>
              Get Recommendation
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.outputBox}>
            <Typography variant="body1">{response}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AskAI;
