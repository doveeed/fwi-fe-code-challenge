import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Avatar from '../Avatar';
import { COUNTRIES } from '../constants';
import {
  openPlayerInfoDialog,
  modifyPlayerSuccess,
  openDeletePlayerDialog,
} from '../appState/actions';

const TableRow = ({ player }) => {
  const dispatch = useDispatch();
  const { id, name, country, winnings, imageUrl } = player;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modifyPlayer = async (playerData) => {
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

  const handleModifyClick = () => {
    handleClose();
    dispatch(
      openPlayerInfoDialog({
        player,
        title: 'Modify player',
        submitText: 'Save',
        onSubmit: modifyPlayer,
      })
    );
  };

  const handleDeleteClick = () => {
    handleClose();
    dispatch(openDeletePlayerDialog(id));
  };

  return (
    <tr key={id} role="row" className="table__row">
      <td role="gridcell" className="table__avatar">
        <Avatar src={imageUrl} />
      </td>
      <td role="gridcell" className="table__player table--body__player">
        {name}
      </td>
      <td role="gridcell" className="table__winnings table--body__winnings">
        {winnings.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        })}
      </td>
      <td role="gridcell" className="table__native table--body__native">
        <div className="country">
          <Avatar>
            <Flags code={country} alt="" />
          </Avatar>
          {country}
        </div>
      </td>
      <td role="gridcell" className="table__actions">
        <div className="actions">
          <IconButton
            aria-label="open player options"
            size="small"
            onClick={handleClick}
          >
            <MoreHorizIcon fontSize="inherit" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleModifyClick}>Modify</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
          {/* <ModifyPlayer
            player={{ id, name, country, winnings, imageUrl }}
            />
            <DeletePlayer playerId={id} /> */}
        </div>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.oneOf(Object.keys(COUNTRIES)),
    winnings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRow;
