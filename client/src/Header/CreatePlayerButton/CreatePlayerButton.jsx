import React from 'react';
import { batch, useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {
  clearAllPlayers,
  openPlayerInfoDialog,
  showAlert,
  updatePlayerTable,
} from '../../appState/actions';
import './CreatePlayerButton.scss';

const CreatePlayerButton = () => {
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
      batch(() => {
        dispatch(clearAllPlayers());
        dispatch(
          updatePlayerTable({ from: 0, size: 25, timestamp: Date.now() })
        );
        dispatch(
          showAlert({
            type: 'success',
            message: `Success! Created player ${playerData.name}`,
          })
        );
      });
    } else {
      dispatch(
        showAlert({
          type: 'error',
          message: `Error! Failed to create player ${playerData.name}`,
        })
      );
    }
  };

  return (
    <>
      <Button
        aria-label="New player"
        className="create-player-button button-relative"
        onClick={handleOpenDialog}
        size="medium"
        data-testid="create-player-button-relative"
      >
        New player
      </Button>
      <Tooltip title="Add player" placement="top">
        <IconButton
          aria-label="New player"
          className="create-player-button button-fixed"
          onClick={handleOpenDialog}
          size="medium"
          data-testid="create-player-button-fixed"
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CreatePlayerButton;
