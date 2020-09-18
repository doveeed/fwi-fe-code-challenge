import React from 'react';
import { renderWithStore } from './test/utils';
import App from './App';

describe('App', () => {
  it('should render App', async () => {
    const { findByTestId } = renderWithStore(<App />, {
      playerTable: {
        sortBy: 'name',
        sortOrder: 'asc',
        from: 0,
        size: 25,
        timestamp: Date.now(),
      },
      players: {
        player3: {
          name: 'Test 1',
          country: 'US',
          winnings: 10000,
          imageUrl: 'https://test.com',
          id: 'player3',
        },
        player4: {
          name: 'Test 2',
          country: 'US',
          winnings: 10000,
          imageUrl: 'https://test.com',
          id: 'player4',
        },
      },
      alerts: {},
      deletePlayerDialog: {
        open: false,
        playerId: 'test-player-id',
      },
      playerInfoDialog: {
        open: false,
        onSubmit: jest.fn(),
        title: 'Test',
        submitText: 'Submit',
      },
    });

    const table = await findByTestId('player-table');
    expect(table).toBeInTheDocument();
  });
});
