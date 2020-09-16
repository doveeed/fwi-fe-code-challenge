import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { clearAllPlayers, updatePlayerTable } from '../appState/actions';
import { getPlayerTable } from '../appState/selectors';
import {
  SORT_ORDER_ASC,
  SORT_ORDER_DESC,
  PLAYER_SORTABLE_FIELDS,
} from '../constants';

const TableHeader = () => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector(getPlayerTable);

  const sortPlayersBy = (sortId) => {
    const playerTableUpdates = {};
    if (sortId === sortBy) {
      playerTableUpdates.sortOrder =
        sortOrder === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC;
    } else {
      playerTableUpdates.sortBy = sortId;
      playerTableUpdates.sortOrder = SORT_ORDER_ASC;
    }
    playerTableUpdates.from = 0;
    batch(() => {
      dispatch(updatePlayerTable(playerTableUpdates));
      dispatch(clearAllPlayers());
    });
  };

  return (
    <table
      id="player-table-header"
      role="presentation"
      className="table table--fixed"
    >
      <thead>
        <tr role="row">
          <th role="columnheader" className="table__header table__avatar" />
          <th role="columnheader" className="table__header table__player">
            <button onClick={() => sortPlayersBy(PLAYER_SORTABLE_FIELDS.name)}>
              Player
            </button>
          </th>
          <th role="columnheader" className="table__header table__winnings">
            <button
              onClick={() => sortPlayersBy(PLAYER_SORTABLE_FIELDS.winnings)}
            >
              Winnings
            </button>
          </th>
          <th role="columnheader" className="table__header table__native">
            <button
              onClick={() => sortPlayersBy(PLAYER_SORTABLE_FIELDS.country)}
            >
              Native of
            </button>
          </th>
          <th role="columnheader" className="table__header table__native">
            Actions
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default TableHeader;
