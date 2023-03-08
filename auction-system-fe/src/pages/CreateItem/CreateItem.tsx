import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

// services
import httpRequest from "../../services/httpRequest";

// configs
import { PATH_NAME } from "../../config";

export default function CreateItem() {
  // hooks
  const navigate = useNavigate();

  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentdate = new Date(); 
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`
    const bodyData = {
      name: data.get("name"),
      price: Number(data.get("price")),
      time_window: `${data.get("time_window")} ${time}`,
    }

    httpRequest.post('/api/product', bodyData)
      .then(() => {
        navigate(PATH_NAME.ROOT)
      })
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
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="price"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Price"
              type="number"
              name="price"
              autoFocus
            />
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="time_window"
            label="Time Window"
            type="date"
            id="time_window"
            placeholder=""
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
