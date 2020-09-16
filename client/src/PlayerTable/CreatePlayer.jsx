import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PlayerInfoDialog from './PlayerInfoDialog';
import { useDispatch } from 'react-redux';
import { createPlayerSuccess } from '../appState/actions';

const CreatePlayer = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const createPlayer = async (playerData) => {
    handleCloseDialog();
    const response = await fetch('http://localhost:3001/players', {
      method: 'POST',
      body: JSON.stringify(playerData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createPlayerSuccess(data));
    } else {
      // TODO handle error
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleOpenDialog} variant="contained">
        New player
      </Button>
      <PlayerInfoDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={createPlayer}
        submitText="Add"
      />
    </>
  );
};

export default CreatePlayer;
