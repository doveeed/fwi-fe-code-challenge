import { CREATE_PLAYER_SUCCESS, FETCH_PLAYERS_SUCCESS } from './constants';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function createPlayerSuccess(data) {
  return { type: CREATE_PLAYER_SUCCESS, payload: { data } };
}
