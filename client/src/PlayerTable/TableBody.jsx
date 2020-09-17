import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import { COUNTRIES } from '../constants';
import { updatePlayerTable } from '../appState/actions';
import { getPlayerTable } from '../appState/selectors';
import TableRow from './TableRow';

const TableBody = ({ players }) => {
  const dispatch = useDispatch();
  const { total, from } = useSelector(getPlayerTable);

  const fetchMorePlayers = () => {
    dispatch(updatePlayerTable({ from: players.length }));
  };

  return (
    <>
      <InfiniteScroll
        dataLength={players.length}
        next={fetchMorePlayers}
        hasMore={!total || from < total}
        loader={<h4 style={{ textAlign: 'center' }}>Loading players...</h4>}
      >
        <table
          id="player-table-body"
          role="presentation"
          className="table table--body"
        >
          <tbody>
            {players.map((player) => (
              <TableRow key={player.id} player={player} />
            ))}
            {total === 0 && <div>No players added, yet!</div>}
          </tbody>
        </table>
      </InfiniteScroll>
      <div style={{ display: 'flex', height: '4rem' }}></div>
    </>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;
