import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithStore } from '../test/utils';
import PlayerTable from './PlayerTable';

describe('PlayerTable', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => ({
          players: [],
        }),
      })
    );
  });
  it('should render PlayerTable and scroll to bottom', async () => {
    const { findByTestId } = renderWithStore(<PlayerTable />, {
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
    fireEvent.scroll(global.window, { y: 1000 });
  });

  it('should render PlayerTable and handle sort button clicks', async () => {
    const { findByTestId } = renderWithStore(<PlayerTable />, {
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

    const nameSortButton = await findByTestId('table-header-name-sort');
    const winningsSortButton = await findByTestId('table-header-winnings-sort');

    fireEvent.click(nameSortButton);
    fireEvent.click(winningsSortButton);
  });
});
