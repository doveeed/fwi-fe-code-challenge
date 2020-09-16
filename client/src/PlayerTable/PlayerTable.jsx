import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPlayersSuccess } from '../appState/actions';
import { getPlayers, getPlayerTable } from '../appState/selectors';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import DeletePlayerDialog from './DeletePlayerDialog';
import PlayerInfoDialog from './PlayerInfoDialog';
import './PlayerTable.scss';

const PlayerTable = () => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder, from, size, timestamp } = useSelector(
    getPlayerTable
  );

  useEffect(() => {
    (async function fetchPlayers() {
      const response = await fetch(
        `http://localhost:3001/players?sortBy=${sortBy}&sortOrder=${sortOrder}&from=${from}&size=${size}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const json = await response.json();
      dispatch(fetchPlayersSuccess(json));
    })();
  }, [dispatch, sortBy, sortOrder, from, size, timestamp]);

  const players = useSelector(getPlayers);

  return (
    <div
      id="player-table-grid"
      role="grid"
      aria-label="Poker Players"
      className="player-table"
    >
      <TableHeader />
      <TableBody players={players} />
      <PlayerInfoDialog />
      <DeletePlayerDialog />
    </div>
  );
};

export default PlayerTable;
