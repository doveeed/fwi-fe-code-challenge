import deletePlayerDialog from './deletePlayerDialog';
import { closeDeletePlayerDialog, openDeletePlayerDialog } from './actions';
import {
  CLOSE_DELETE_PLAYER_DIALOG,
  OPEN_DELETE_PLAYER_DIALOG,
} from './constants';
import { getDeletePlayerDialog } from './selectors';

describe('deletePlayerDialog', () => {
  describe('actions', () => {
    it('should return the type for openDeletePlayerDialog', () => {
      expect(openDeletePlayerDialog().type).toEqual(OPEN_DELETE_PLAYER_DIALOG);
    });

    it('should return the type for closeDeletePlayerDialog', () => {
      expect(closeDeletePlayerDialog().type).toEqual(
        CLOSE_DELETE_PLAYER_DIALOG
      );
    });
  });

  describe('reducer', () => {
    it('should return the original state for unknown action type', () => {
      const state = {};
      expect(deletePlayerDialog(state, { type: 'UNKNOWN' })).toEqual(state);
    });

    it('should open the dialog', () => {
      const state = {
        open: false,
        playerId: undefined,
      };

      const action = {
        type: OPEN_DELETE_PLAYER_DIALOG,
        payload: {
          data: 'test-player-id',
        },
      };
      expect(deletePlayerDialog(state, action)).toEqual({
        open: true,
        playerId: action.payload.data,
      });
    });

    it('should close the dialog and remove the playerId', () => {
      const state = {
        open: true,
        playerId: 'test-player-id',
      };
      const action = {
        type: CLOSE_DELETE_PLAYER_DIALOG,
      };
      expect(deletePlayerDialog(state, action)).toEqual({
        open: false,
        playerId: undefined,
      });
    });
  });

  describe('selectors', () => {
    it('should get the deletePlayerDialog from the state', () => {
      const state = {
        deletePlayerDialog: {
          open: false,
          playerId: undefined,
        },
      };
      expect(getDeletePlayerDialog(state)).toEqual(state.deletePlayerDialog);
    });
  });
});
