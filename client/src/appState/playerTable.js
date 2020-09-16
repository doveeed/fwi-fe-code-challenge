import { UPDATE_PLAYER_TABLE, FETCH_PLAYERS_SUCCESS } from './constants';

const defaultTableState = {
  sortBy: 'name',
  sortOrder: 'asc',
  from: 0,
  size: 25,
  total: undefined,
};

export default function playerTable(state = defaultTableState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_TABLE:
      return {
        ...state,
        ...action.payload.data,
      };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        total: action.payload.data.total,
      };
    default:
      return state;
  }
}
