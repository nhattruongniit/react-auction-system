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

// services
import httpRequest from "../../../services/httpRequest";

// types
import { IProduct } from "../../../types/product";
import { Alert } from "@mui/material";

type IFormDialogProps = {
  openDialog: boolean;
  product: IProduct;
  handleSetOpenDialog: () => void;
};

export default function FormDialog({
  openDialog,
  product,
  handleSetOpenDialog,
}: IFormDialogProps) {
  // hooks
  const { user } = useAppContext();
  // states
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bid = Number(formData.get("bid"));

    if (bid <= product.price) {
      setErrorMessage("Bid price must be higher than current price");
      return;
    }

    setErrorMessage("");
    const bodyData = {
      bid,
      productId: product._id,
    };

    httpRequest.put(`/api/user/${user.id}`, bodyData).then(() => {
      handleSetOpenDialog();
    });
  };

  return (
    <div>
      <Dialog open={openDialog} maxWidth="xs" fullWidth>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Bid Item Name</DialogTitle>
          <DialogContent>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
