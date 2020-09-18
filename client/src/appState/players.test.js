import players from './players';
import {
  clearAllPlayers,
  fetchPlayersSuccess,
  modifyPlayerSuccess,
} from './actions';
import {
  CLEAR_ALL_PLAYERS,
  FETCH_PLAYERS_SUCCESS,
  MODIFY_PLAYER_SUCCESS,
} from './constants';
import { getPlayers } from './selectors';

describe('players', () => {
  describe('actions', () => {
    it('should return the type for fetchPlayersSuccess', () => {
      expect(fetchPlayersSuccess().type).toEqual(FETCH_PLAYERS_SUCCESS);
    });

    it('should return the type for modifyPlayerSuccess', () => {
      expect(modifyPlayerSuccess().type).toEqual(MODIFY_PLAYER_SUCCESS);
    });

    it('should return the type for clearAllPlayers', () => {
      expect(clearAllPlayers().type).toEqual(CLEAR_ALL_PLAYERS);
    });
  });

  describe('reducer', () => {
    it('should return the original state for unknown action type', () => {
      const state = {};
      expect(players(state, { type: 'UNKNOWN' })).toEqual(state);
    });

    it('should add the players to the state', () => {
      const newPlayer = {
        id: 'test-player-id',
        name: 'Test',
        winnings: 1,
        imageUrl: 'http:/test.com',
      };
      const state = {};
      const action = {
        type: FETCH_PLAYERS_SUCCESS,
        payload: {
          data: {
            players: [newPlayer],
          },
        },
      };
      const newState = players(state, action);
      expect(newState[newPlayer.id]).toEqual(newPlayer);
    });

    it('should modify the players', () => {
      const player = {
        id: 'test-player-id',
        name: 'Test',
        winnings: 1,
        imageUrl: 'http:/test.com',
      };
      const newPlayer = {
        id: 'test-player-id',
        name: 'Test',
        winnings: 10000,
        imageUrl: 'http:/test.com',
      };
      const state = {
        [player.id]: player,
      };
      const action = {
        type: MODIFY_PLAYER_SUCCESS,
        payload: {
          data: newPlayer,
        },
      };
      const newState = players(state, action);
      expect(newState[newPlayer.id]).toEqual(newPlayer);
    });

    it('should clear the players', () => {
      const player = {
        id: 'test-player-id',
        name: 'Test',
        winnings: 1,
        imageUrl: 'http:/test.com',
      };
      const state = {
        [player.id]: player,
      };
      const action = {
        type: CLEAR_ALL_PLAYERS,
      };
      expect(players(state, action)).toEqual({});
    });
  });

  describe('selectors', () => {
    it('should get the players from the state', () => {
      const state = {
        players: {
          id1: {},
          id2: {},
        },
      };
      expect(getPlayers(state).length).toEqual(2);
    });
  });
});
