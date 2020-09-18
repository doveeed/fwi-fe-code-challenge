import React from 'react';
import { renderWithStore } from '../../test/utils';
import Alerts from './Alerts';

jest.useFakeTimers();

describe('Alerts', () => {
  it('should render Alerts', async () => {
    const { findByTestId } = renderWithStore(<Alerts />, {
      alerts: {
        alert1: {
          message: 'Test alert',
          type: 'success',
        },
      },
    });

    const alert = await findByTestId('alerts_alert1');
    expect(alert).toBeInTheDocument();
    jest.advanceTimersByTime(5000);
  });
});
