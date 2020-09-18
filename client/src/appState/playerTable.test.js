import playerTable from './playerTable';
import { updatePlayerTable } from './actions';
import { FETCH_PLAYERS_SUCCESS, UPDATE_PLAYER_TABLE } from './constants';
import { getPlayerTable } from './selectors';

describe('playerTable', () => {
  describe('actions', () => {
    it('should return the type', () => {
      expect(updatePlayerTable().type).toEqual(UPDATE_PLAYER_TABLE);
    });
  });

  describe('reducer', () => {
    it('should return the original state for unknown action type', () => {
      const state = {};
      expect(playerTable(state, { type: 'UNKNOWN' })).toEqual(state);
    });

    it('should update the table state', () => {
      const state = {};
      const action = {
        type: UPDATE_PLAYER_TABLE,
        payload: {
          data: {
            sortBy: 'name',
            sortOrder: 'asc',
            from: 0,
            size: 25,
          },
        },
      };
      expect(playerTable(state, action)).toEqual(action.payload.data);
    });

    it('should set the total on FETCH_PLAYERS_SUCCESS', () => {
      const state = {
        from: 0,
        size: 25,
      };
      const action = {
        type: FETCH_PLAYERS_SUCCESS,
        payload: {
          data: {
            total: 100,
          },
        },
      };
      expect(playerTable(state, action)).toEqual({
        ...state,
        total: action.payload.data.total,
      });
    });
  });

  describe('selectors', () => {
    it('should get the playerTable from the state', () => {
      const state = {
        playerTable: {
          from: 0,
          size: 25,
          total: 100,
        },
      };
      expect(getPlayerTable(state)).toEqual(state.playerTable);
    });
  });
});
