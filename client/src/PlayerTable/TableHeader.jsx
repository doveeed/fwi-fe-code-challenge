import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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

  const SortArrow =
    sortOrder === SORT_ORDER_ASC ? ArrowUpwardIcon : ArrowDownwardIcon;

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
            <Button
              aria-label="Sort by Player"
              endIcon={
                sortBy === PLAYER_SORTABLE_FIELDS.name ? (
                  <SortArrow />
                ) : undefined
              }
              onClick={() => sortPlayersBy(PLAYER_SORTABLE_FIELDS.name)}
              data-testid="table-header-name-sort"
            >
              Player
            </Button>
          </th>
          <th role="columnheader" className="table__header table__winnings">
            <Button
              aria-label="Sorty by Winnigs"
              endIcon={
                sortBy === PLAYER_SORTABLE_FIELDS.winnings ? (
                  <SortArrow />
                ) : undefined
              }
              onClick={() => sortPlayersBy(PLAYER_SORTABLE_FIELDS.winnings)}
              data-testid="table-header-winnings-sort"
            >
              Winnings
            </Button>
          </th>
          <th role="columnheader" className="table__header table__native">
            <Button
              aria-label="Sort by Native of"
              endIcon={
                sortBy === PLAYER_SORTABLE_FIELDS.country ? (
                  <SortArrow />
                ) : undefined
              }
              onClick={() => sortPlayersBy(PLAYER_SORTABLE_FIELDS.country)}
              data-testid="table-header-country-sort"
            >
              Native of
            </Button>
          </th>
          <th role="columnheader" className="table__header table__actions"></th>
        </tr>
      </thead>
    </table>
  );
};

export default TableHeader;
