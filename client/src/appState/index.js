import { combineReducers } from 'redux';
import players from './players';
import playerTable from './playerTable';
import playerInfoDialog from './playerInfoDialog';
import deletePlayerDialog from './deletePlayerDialog';
import alerts from './alerts';

export default combineReducers({
  players,
  playerTable,
  playerInfoDialog,
  deletePlayerDialog,
  alerts,
});
