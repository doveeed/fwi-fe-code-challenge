import alerts from './alerts';
import { hideAlert, showAlert } from './actions';
import { HIDE_ALERT, SHOW_ALERT } from './constants';
import { getAlerts } from './selectors';

describe('alerts', () => {
  describe('actions', () => {
    it('should return the type for showAlert', () => {
      expect(showAlert().type).toEqual(SHOW_ALERT);
    });

    it('should return the type for hideAlert', () => {
      expect(hideAlert().type).toEqual(HIDE_ALERT);
    });
  });

  describe('reducer', () => {
    it('should return the original state for unknown action type', () => {
      const state = {};
      expect(alerts(state, { type: 'UNKNOWN' })).toEqual(state);
    });

    it('should add the new alert to the state', () => {
      const now = Date.now();
      const state = {};
      const action = {
        type: SHOW_ALERT,
        payload: {
          data: {
            id: now,
            message: 'Test',
          },
        },
      };
      const newState = alerts(state, action);
      expect(newState[now]).toEqual(action.payload.data);
    });

    it('should remove the alert from the state', () => {
      const now = Date.now();
      const state = {
        [now]: {
          id: now,
          message: 'Test',
        },
      };
      const action = {
        type: HIDE_ALERT,
        payload: {
          data: now,
        },
      };
      const newState = alerts(state, action);
      expect(newState[now]).not.toBeDefined();
    });
  });

  describe('selectors', () => {
    it('should get the alerts from the state', () => {
      const state = {
        alerts: {},
      };
      expect(getAlerts(state)).toEqual(state.alerts);
    });
  });
});
