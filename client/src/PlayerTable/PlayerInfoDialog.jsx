import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { COUNTRIES } from '../constants';
import { getPlayerInfoDialog } from '../appState/selectors';
import { closePlayerInfoDialog } from '../appState/actions';

const sortEntriesAlphabeticallyAscending = (entry1, entry2) => {
  if (entry2[1] > entry1[1]) {
    return -1;
  } else if (entry1[1] > entry2[1]) {
    return 1;
  } else {
    return 0;
  }
};

const PlayerInfoDialog = () => {
  const dispatch = useDispatch();
  const { open, player, onSubmit, submitText, title } = useSelector(
    getPlayerInfoDialog
  );
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [winnings, setWinnings] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (player) {
      setName(player.name);
      setCountry(player.country);
      setWinnings(player.winnings);
      setImageUrl(player.imageUrl);
    }
  }, [player]);

  const handleCloseDialog = () => {
    dispatch(closePlayerInfoDialog());
    setName('');
    setCountry('');
    setWinnings('');
    setImageUrl('');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleWinningsChange = (e) => {
    setWinnings(parseFloat(e.target.value));
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = () => {
    const playerData = {
      name,
      country,
      winnings,
      imageUrl,
    };

    if (onSubmit) {
      onSubmit(Object.assign({}, player, playerData));
    }
    dispatch(closePlayerInfoDialog());
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          id="player-name"
          label="Name"
          onChange={handleNameChange}
          value={name}
        />
        <FormControl fullWidth>
          <InputLabel id="player-country-label">Country</InputLabel>
          <Select
            fullWidth
            id="player-country"
            labelId="player-country-label"
            onChange={handleCountryChange}
            value={country}
          >
            {Object.entries(COUNTRIES)
              .sort(sortEntriesAlphabeticallyAscending)
              .map(([key, value]) => (
                <MenuItem value={key} key={key}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          id="standard-number"
          label="Winnings"
          type="number"
          onChange={handleWinningsChange}
          value={winnings}
          fullWidth
        />
        <TextField
          id="standard-number"
          label="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerInfoDialog;
