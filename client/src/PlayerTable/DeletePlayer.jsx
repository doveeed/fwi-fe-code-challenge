import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/core/styles';

import { deletePlayerSuccess } from '../appState/actions';
import themeAlert from '../themeAlert';

const DeletePlayer = ({ playerId }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const deletePlayer = async () => {
    handleCloseDialog();
    const response = await fetch(`http://localhost:3001/players/${playerId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      dispatch(deletePlayerSuccess(playerId));
    } else {
      // TODO handle error
    }
  };

  return (
    <>
      <Button onClick={handleOpenDialog}>Delete</Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete player</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this player? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ThemeProvider theme={themeAlert}>
            <Button onClick={deletePlayer} color="primary">
              Delete
            </Button>
          </ThemeProvider>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePlayer;
