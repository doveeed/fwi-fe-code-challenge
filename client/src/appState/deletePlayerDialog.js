import {
  CLOSE_DELETE_PLAYER_DIALOG,
  OPEN_DELETE_PLAYER_DIALOG,
} from './constants';

const defaultPlayerInfoDialogState = {
  open: false,
  playerId: undefined,
};

export default function playerInfoDialog(
  state = defaultPlayerInfoDialogState,
  action
) {
  switch (action.type) {
    case OPEN_DELETE_PLAYER_DIALOG:
      return {
        ...state,
        open: true,
        playerId: action.payload.data,
      };
    case CLOSE_DELETE_PLAYER_DIALOG:
      return {
        ...state,
        open: false,
        playerId: undefined,
      };
    default:
      return state;
  }
}
