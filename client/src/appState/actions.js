import {
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  FETCH_PLAYERS_SUCCESS,
  MODIFY_PLAYER_SUCCESS,
  CLEAR_ALL_PLAYERS,
  UPDATE_PLAYER_TABLE,
} from './constants';

// players
export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function createPlayerSuccess(data) {
  return { type: CREATE_PLAYER_SUCCESS, payload: { data } };
}

export function modifyPlayerSuccess(data) {
  return { type: MODIFY_PLAYER_SUCCESS, payload: { data } };
}

export function deletePlayerSuccess(data) {
  return { type: DELETE_PLAYER_SUCCESS, payload: { data } };
}

export function clearAllPlayers() {
  return { type: CLEAR_ALL_PLAYERS };
}

// playerTable
export function updatePlayerTable(data) {
  return { type: UPDATE_PLAYER_TABLE, payload: { data } };
}
