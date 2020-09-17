import { SHOW_ALERT, HIDE_ALERT } from './constants';

export default function alerts(state = {}, action) {
  switch (action.type) {
    case SHOW_ALERT:
      const newState = {
        ...state,
        [action.payload.data.id]: action.payload.data,
      };
      return newState;
    case HIDE_ALERT:
      const { [action.payload.data]: payload, ...rest } = state;
      return rest;
    default:
      return state;
  }
}
