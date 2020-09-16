import { CLOSE_PLAYER_INFO_DIALOG, OPEN_PLAYER_INFO_DIALOG } from './constants';

const defaultPlayerInfoDialogState = {
  open: false,
  player: undefined,
  onSubmit: undefined,
  submitText: 'Add',
  title: 'New player',
};

export default function playerInfoDialog(
  state = defaultPlayerInfoDialogState,
  action
) {
  switch (action.type) {
    case OPEN_PLAYER_INFO_DIALOG:
      return {
        ...state,
        ...action.payload.data,
        open: true,
      };
    case CLOSE_PLAYER_INFO_DIALOG:
      return {
        ...state,
        open: false,
        player: undefined,
      };
    default:
      return state;
  }
}
