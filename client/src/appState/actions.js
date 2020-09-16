import {
  FETCH_PLAYERS_SUCCESS,
  MODIFY_PLAYER_SUCCESS,
  CLEAR_ALL_PLAYERS,
  UPDATE_PLAYER_TABLE,
  OPEN_PLAYER_INFO_DIALOG,
  CLOSE_PLAYER_INFO_DIALOG,
  CLOSE_DELETE_PLAYER_DIALOG,
  OPEN_DELETE_PLAYER_DIALOG,
} from './constants';

// players
export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function modifyPlayerSuccess(data) {
  return { type: MODIFY_PLAYER_SUCCESS, payload: { data } };
}

export function clearAllPlayers() {
  return { type: CLEAR_ALL_PLAYERS };
}

// playerTable
export function updatePlayerTable(data) {
  return { type: UPDATE_PLAYER_TABLE, payload: { data } };
}

// playerInfoDialog
export function openPlayerInfoDialog(data) {
  return { type: OPEN_PLAYER_INFO_DIALOG, payload: { data } };
}

export function closePlayerInfoDialog() {
  return { type: CLOSE_PLAYER_INFO_DIALOG };
}

// deletePlayerDialog
export function openDeletePlayerDialog(data) {
  return { type: OPEN_DELETE_PLAYER_DIALOG, payload: { data } };
}

export function closeDeletePlayerDialog() {
  return { type: CLOSE_DELETE_PLAYER_DIALOG };
}
