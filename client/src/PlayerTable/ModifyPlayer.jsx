import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import { modifyPlayerSuccess } from '../appState/actions';
import PlayerInfoDialog from './PlayerInfoDialog';

const ModifyPlayer = ({ player }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const modifyPlayer = async (playerData) => {
    handleCloseDialog();
    const { id, ...requestData } = playerData;
    const response = await fetch(`http://localhost:3001/players/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(requestData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(modifyPlayerSuccess(data));
    } else {
      // TODO handle error
    }
  };

  return (
    <>
      <Button onClick={handleOpenDialog}>Modify</Button>
      <PlayerInfoDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={modifyPlayer}
        player={player}
        title="Modify player"
        submitText="Save"
      />
    </>
  );
};

export default ModifyPlayer;
