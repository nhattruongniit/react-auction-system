import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function CreateItem() {
  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      price: data.get("price"),
      time_window: data.get("time_window"),
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "90%" }}
        >
          <Typography component="h1" variant="h5">
            Create Item
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Start Price"
            type="text"
            id="price"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="time_window"
            label="Time Window"
            type="text"
            id="time_window"
          />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ mt: 1, mb: 2 }}
          >
            <Grid item>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
