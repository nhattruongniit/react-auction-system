import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Deposit() {
  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      deposit: data.get("deposit"),
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
            Deposit
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="deposit"
            label="Amount"
            name="deposit"
            autoFocus
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
                Deposit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
