import React, { useState } from 'react';
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

const sortEntriesAlphabeticallyAscending = (entry1, entry2) => {
  if (entry2[1] > entry1[1]) {
    return -1;
  } else if (entry1[1] > entry2[1]) {
    return 1;
  } else {
    return 0;
  }
};

const PlayerInfoDialog = ({
  open = false,
  player,
  onSubmit,
  onClose,
  submitText = 'Add',
  title = 'New player',
}) => {
  const [country, setCountry] = useState(player ? player.country : '');
  const [name, setName] = useState(player ? player.name : '');
  const [winnings, setWinnings] = useState(player ? player.winnings : '');
  const [imageUrl, setImageUrl] = useState(player ? player.imageUrl : '');

  const handleCloseDialog = (e) => {
    onClose(e);
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
