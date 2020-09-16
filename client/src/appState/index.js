import { combineReducers } from 'redux';
import players from './players';
import playerTable from './playerTable';

export default combineReducers({
  players,
  playerTable,
});
