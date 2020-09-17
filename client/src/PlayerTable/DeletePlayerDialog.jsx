import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/core/styles';

import {
  closeDeletePlayerDialog,
  clearAllPlayers,
  updatePlayerTable,
  showAlert,
} from '../appState/actions';
import themeAlert from '../themeAlert';
import { getDeletePlayerDialog } from '../appState/selectors';

const DeletePlayerDialog = () => {
  const dispatch = useDispatch();
  const { open, playerId } = useSelector(getDeletePlayerDialog);

  const handleCloseDialog = () => {
    dispatch(closeDeletePlayerDialog());
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
      batch(() => {});
      dispatch(clearAllPlayers());
      dispatch(updatePlayerTable({ from: 0, size: 25, timestamp: Date.now() }));
      dispatch(
        showAlert({ type: 'success', message: 'Success! Player deleted' })
      );
    } else {
      dispatch(
        showAlert({ type: 'error', message: 'Error! Could not delete player' })
      );
    }
  };

  return (
    <Dialog
      open={open}
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
          <Button onClick={deletePlayer} color="primary" aria-label="Delete">
            Delete
          </Button>
        </ThemeProvider>
        <Button onClick={handleCloseDialog} aria-label="Cancel">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlayerDialog;
