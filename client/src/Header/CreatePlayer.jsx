import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import {
  clearAllPlayers,
  openPlayerInfoDialog,
  updatePlayerTable,
} from '../appState/actions';
import './CreatePlayer.scss';

const CreatePlayer = () => {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(
      openPlayerInfoDialog({
        title: 'Add player',
        submitText: 'Add',
        onSubmit: createPlayer,
      })
    );
  };

  const createPlayer = async (playerData) => {
    const response = await fetch('http://localhost:3001/players', {
      method: 'POST',
      body: JSON.stringify(playerData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      dispatch(clearAllPlayers());
      dispatch(updatePlayerTable({ from: 0, size: 25, timestamp: Date.now() }));
    } else {
      // TODO handle error
    }
  };

  return (
    <>
      <Button
        className="create-player-button"
        color="primary"
        onClick={handleOpenDialog}
        variant="contained"
      >
        New player
      </Button>
    </>
  );
};

export default CreatePlayer;
