import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

// hooks
import { useAppContext } from "../../../context/AppContext";
import httpRequest from "../../../services/httpRequest";

type IFormDialogProps = {
  openDialog: boolean;
  productId: string;
  handleSetOpenDialog: () => void;
};

export default function FormDialog({
  openDialog,
  productId,
  handleSetOpenDialog,
}: IFormDialogProps) {
  // hooks
  const { user } = useAppContext();

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const bodyData = {
      bid: Number(data.get("bid")),
      productId,
    };

    httpRequest.put(`/api/user/${user.id}`, bodyData).then((res) => {
      handleSetOpenDialog();
    });
  };

  return (
    <div>
      <Dialog open={openDialog} maxWidth="xs" fullWidth>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Bid Item Name</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="bid"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Bid Price"
                type="number"
                name="bid"
                required
                autoFocus
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSetOpenDialog}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
