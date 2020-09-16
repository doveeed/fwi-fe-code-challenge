import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import InfiniteScroll from 'react-infinite-scroll-component';

import Avatar from '../Avatar';
import { COUNTRIES } from '../constants';
import { updatePlayerTable } from '../appState/actions';
import { getPlayerTable } from '../appState/selectors';
import ModifyPlayer from './ModifyPlayer';
import DeletePlayer from './DeletePlayer';

const TableBody = ({ players }) => {
  const dispatch = useDispatch();
  const { total, from } = useSelector(getPlayerTable);

  const fetchMorePlayers = () => {
    dispatch(updatePlayerTable({ from: players.length }));
  };

  return (
    <InfiniteScroll
      dataLength={players.length}
      next={fetchMorePlayers}
      hasMore={!total || from < total}
      loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
    >
      <table
        id="player-table-body"
        role="presentation"
        className="table table--body"
      >
        <tbody>
          {players.map(({ id, name, country, winnings, imageUrl }) => (
            <tr key={id} role="row" className="table__row">
              <td role="gridcell" className="table__avatar">
                <Avatar src={imageUrl} />
              </td>
              <td role="gridcell" className="table__player">
                {name}
              </td>
              <td role="gridcell" className="table__winnings">
                {winnings.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td role="gridcell" className="table__native">
                <div className="country">
                  <Avatar>
                    <Flags code={country} alt="" />
                  </Avatar>
                  {country}
                </div>
              </td>
              <td role="gridcell" className="table__native">
                <div className="edit player">
                  <ModifyPlayer
                    player={{ id, name, country, winnings, imageUrl }}
                  />
                  <DeletePlayer playerId={id} />
                </div>
              </td>
            </tr>
          ))}
          {total === 0 && <div>No players added, yet!</div>}
        </tbody>
      </table>
    </InfiniteScroll>
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
