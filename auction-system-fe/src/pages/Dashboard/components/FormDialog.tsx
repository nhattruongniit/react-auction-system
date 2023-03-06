import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type IFormDialogProps = {
  openDialog: boolean;
  handleSetOpenDialog: () => void;
}

export default function FormDialog({ openDialog, handleSetOpenDialog}: IFormDialogProps) {
  return (
    <div>
    
      <Dialog 
        open={openDialog} 
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Bid Item Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Bid Price"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetOpenDialog}>Cancel</Button>
          <Button onClick={handleSetOpenDialog}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
