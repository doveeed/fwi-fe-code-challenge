import playerInfoDialog from './playerInfoDialog';
import { closePlayerInfoDialog, openPlayerInfoDialog } from './actions';
import { CLOSE_PLAYER_INFO_DIALOG, OPEN_PLAYER_INFO_DIALOG } from './constants';
import { getPlayerInfoDialog } from './selectors';

describe('playerInfoDialog', () => {
  describe('actions', () => {
    it('should return the type for openPlayerInfoDialog', () => {
      expect(openPlayerInfoDialog().type).toEqual(OPEN_PLAYER_INFO_DIALOG);
    });

    it('should return the type for closePlayerInfoDialog', () => {
      expect(closePlayerInfoDialog().type).toEqual(CLOSE_PLAYER_INFO_DIALOG);
    });
  });

  describe('reducer', () => {
    it('should return the original state for unknown action type', () => {
      const state = {};
      expect(playerInfoDialog(state, { type: 'UNKNOWN' })).toEqual(state);
    });

    it('should open the dialog and set the state', () => {
      const state = {};
      const action = {
        type: OPEN_PLAYER_INFO_DIALOG,
        payload: {
          data: {
            onSubmit: jest.fn(),
            submitText: 'Submit',
            title: 'Title',
          },
        },
      };
      expect(playerInfoDialog(state, action)).toEqual({
        ...action.payload.data,
        open: true,
      });
    });

    it('should close the dialog and reset the player state', () => {
      const state = {
        open: true,
        onSubmit: jest.fn(),
        submitText: 'Submit',
        title: 'Title',
        player: {
          name: 'Test',
          country: 'US',
          winnings: 10000,
          imageUrl: 'http://test.com',
        },
      };
      const action = { type: CLOSE_PLAYER_INFO_DIALOG };
      expect(playerInfoDialog(state, action)).toEqual({
        ...state,
        open: false,
        player: undefined,
      });
    });
  });

  describe('selectors', () => {
    it('should get the playerInfoDialog from the state', () => {
      const state = {
        playerInfoDialog: {
          open: false,
          player: undefined,
        },
      };
      expect(getPlayerInfoDialog(state)).toEqual(state.playerInfoDialog);
    });
  });
});
