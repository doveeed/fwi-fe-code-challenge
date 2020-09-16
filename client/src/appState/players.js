import {
  CREATE_PLAYER_SUCCESS,
  FETCH_PLAYERS_SUCCESS,
  MODIFY_PLAYER_SUCCESS,
} from './constants';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach((player) => {
    newState[player.id] = player;
  });
  return newState;
}

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    case CREATE_PLAYER_SUCCESS:
    case MODIFY_PLAYER_SUCCESS:
      return mergePlayers(state, { players: [action.payload.data] });
    default:
      return state;
  }
}
