import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';

// services
import httpRequest from "../../services/httpRequest";

// hooks
import { useAppContext } from "../../context/AppContext"

export default function Deposit() {
  // hooks
  const { user, handleSetUser }  = useAppContext();
  // states
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    setAlertMessage('');

    const data = new FormData(event.currentTarget);
    const bodyData = {
      deposit: Number(data.get("deposit")),
    }

    httpRequest.put(`/api/user/${user.id}`, bodyData)
      .then(() => {
        const profile = {
          ...user,
          deposit: user.deposit + bodyData.deposit
        }
        handleSetUser(profile)
        setAlertMessage('Add successfully')
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
            Deposit
          </Typography>

          <br />

          {alertMessage && <Alert severity="success">{alertMessage}</Alert>}

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="deposit"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              type="number"
              name="deposit"
              autoFocus
            />
          </FormControl>

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
