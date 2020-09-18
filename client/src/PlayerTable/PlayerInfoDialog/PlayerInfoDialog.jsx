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
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { COUNTRIES } from '../../constants';
import { getPlayerInfoDialog } from '../../appState/selectors';
import { closePlayerInfoDialog } from '../../appState/actions';

const sortEntriesAlphabeticallyAscending = (entry1, entry2) => {
  if (entry2[1] > entry1[1]) {
    return -1;
  } else if (entry1[1] > entry2[1]) {
    return 1;
  } else {
    return 0;
  }
};

const defaultValidation = {
  name: null,
  country: null,
  winnings: null,
  imageUrl: null,
};

const PlayerInfoDialog = () => {
  const dispatch = useDispatch();
  const { open, player, onSubmit, submitText, title } = useSelector(
    getPlayerInfoDialog
  );
  const [playerInput, setPlayerInput] = useState({
    name: '',
    country: '',
    winnings: '',
    imageUrl: '',
  });
  const [playerValidation, setPlayerValidation] = useState({
    ...defaultValidation,
  });

  useEffect(() => {
    if (player) {
      setPlayerInput({
        name: player.name || '',
        country: player.country || '',
        winnings: player.winnings || '',
        imageUrl: player.imageUrl || '',
      });
    }
  }, [player]);

  const handleCloseDialog = () => {
    dispatch(closePlayerInfoDialog());
    setPlayerInput({
      name: '',
      country: '',
      winnings: '',
      imageUrl: '',
    });
    setPlayerValidation({ ...defaultValidation });
  };

  const handleValidate = (key = undefined, newValue = undefined) => {
    const newValidation = key
      ? {
          ...playerValidation,
          [key]: validateKey(key, newValue),
        }
      : {
          name: validateKey('name', playerInput.name),
          country: validateKey('country', playerInput.country),
          winnings: validateKey('winnings', playerInput.winnings),
          imageUrl: validateKey('imageUrl', playerInput.imageUrl),
        };
    setPlayerValidation(newValidation);
    let isValid = true;
    Object.values(newValidation).forEach((val) => {
      if (val > 0) {
        isValid = false;
      }
    });
    return isValid;
  };

  const validateKey = (key, newValue) => {
    switch (key) {
      case 'name':
      case 'country':
        return !newValue || newValue.length === 0 ? 1 : null;
      case 'winnings':
        return typeof newValue === 'string' || isNaN(newValue) ? 1 : null;
      case 'imageUrl':
        if (player && (!newValue || newValue.length === 0)) {
          return 1;
        } else if (
          newValue &&
          newValue.length > 0 &&
          !RegExp('^https?://.*').test(newValue)
        ) {
          return 2;
        } else {
          return null;
        }
      default:
        return null;
    }
  };

  const handleNameChange = (e) => {
    const key = 'name';
    const newValue = e.target.value;
    setPlayerInput({
      ...playerInput,
      [key]: newValue,
    });

    if (!validateKey(key, newValue)) {
      setPlayerValidation({
        ...playerValidation,
        [key]: null,
      });
    }
  };

  const handleNameBlur = () => {
    handleValidate('name', playerInput.name);
  };

  const handleCountryChange = (e) => {
    const key = 'country';
    const newValue = e.target.value;
    setPlayerInput({
      ...playerInput,
      [key]: newValue,
    });

    if (!validateKey(key, newValue)) {
      setPlayerValidation({
        ...playerValidation,
        [key]: null,
      });
    }
  };

  const handleCountryBlur = () => {
    handleValidate('country', playerInput.country);
  };

  const handleWinningsChange = (e) => {
    const key = 'winnings';
    const parsedValue = parseFloat(e.target.value);
    const newValue = isNaN(parsedValue) ? '' : parsedValue;
    setPlayerInput({
      ...playerInput,
      [key]: newValue,
    });

    if (!validateKey(key, newValue)) {
      setPlayerValidation({
        ...playerValidation,
        [key]: null,
      });
    }
  };

  const handleWinningsBlur = () => {
    handleValidate('winnings', playerInput.winnings);
  };

  const handleImageUrlChange = (e) => {
    const key = 'imageUrl';
    const newValue = e.target.value;
    setPlayerInput({
      ...playerInput,
      [key]: newValue,
    });

    if (!validateKey(key, newValue)) {
      setPlayerValidation({
        ...playerValidation,
        [key]: null,
      });
    }
  };

  const handleImageUrlBlur = () => {
    handleValidate('imageUrl', playerInput.imageUrl);
  };

  const handleSubmit = () => {
    const isValid = handleValidate(undefined);
    if (isValid) {
      const playerData = {
        ...playerInput,
      };

      if (onSubmit) {
        onSubmit(Object.assign({}, player, playerData));
      }
      handleCloseDialog();
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="player-info-dialog-title"
      data-testid="player-info-dialog"
    >
      <DialogTitle id="player-info-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="player-name"
          label="Name"
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          value={playerInput.name}
          error={playerValidation.name > 0 ? true : false}
          helperText={playerValidation.name ? 'Name is required' : null}
          inputProps={{ 'data-testid': 'player-info-name-input' }}
        />
        <FormControl
          fullWidth
          error={playerValidation.country > 0 ? true : false}
        >
          <InputLabel id="player-country-label">Country</InputLabel>
          <Select
            fullWidth
            id="player-country"
            labelId="player-country-label"
            onChange={handleCountryChange}
            onBlur={handleCountryBlur}
            value={playerInput.country}
            inputProps={{ 'data-testid': 'player-info-country-input' }}
          >
            {Object.entries(COUNTRIES)
              .sort(sortEntriesAlphabeticallyAscending)
              .map(([key, value]) => (
                <MenuItem value={key} key={key}>
                  {value}
                </MenuItem>
              ))}
          </Select>
          {playerValidation.country && (
            <FormHelperText>Country is required</FormHelperText>
          )}
        </FormControl>
        <TextField
          id="standard-number"
          label="Winnings"
          type="number"
          onChange={handleWinningsChange}
          onBlur={handleWinningsBlur}
          value={playerInput.winnings}
          error={playerValidation.winnings > 0 ? true : false}
          helperText={playerValidation.winnings ? 'Winnings is required' : null}
          inputProps={{ 'data-testid': 'player-info-winnings-input' }}
          fullWidth
        />
        <TextField
          id="standard-number"
          label="Image URL"
          onChange={handleImageUrlChange}
          onBlur={handleImageUrlBlur}
          value={playerInput.imageUrl}
          error={playerValidation.imageUrl > 0 ? true : false}
          helperText={
            playerValidation.imageUrl === 1
              ? 'Image URL is required'
              : playerValidation.imageUrl === 2
              ? 'Image URL must start with http:// or https://'
              : null
          }
          fullWidth
          inputProps={{ 'data-testid': 'player-info-image-url-input' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} aria-label="Cancel">
          Cancel
        </Button>
        <Button
          aria-label={submitText}
          onClick={handleSubmit}
          color="primary"
          disabled={Object.values(playerValidation).reduce(
            (bool, val) => (val > 0 ? true : bool),
            false
          )}
          data-testid="player-info-dialog-submit-button"
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerInfoDialog;
