import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../test/utils';
import DeletePlayerDialog from './DeletePlayerDialog';

describe('DeletePlayerDialog', () => {
  it('should render DeletePlayerDialog and handle failed delete', async () => {
    const { findByTestId } = renderWithStore(<DeletePlayerDialog />, {
      deletePlayerDialog: {
        open: true,
        playerId: 'test-player-id',
      },
    });

    const dialog = await findByTestId('delete-player-dialog');
    expect(dialog).toBeInTheDocument();
    const deleteButton = await findByTestId('delete-player-submit-button');
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({ ok: false }));
    fireEvent.click(deleteButton);
  });

  it('should render DeletePlayerDialog and handle successful delete', async () => {
    const { findByTestId } = renderWithStore(<DeletePlayerDialog />, {
      deletePlayerDialog: {
        open: true,
        playerId: 'test-player-id',
      },
    });

    const dialog = await findByTestId('delete-player-dialog');
    expect(dialog).toBeInTheDocument();

    const deleteButton = await findByTestId('delete-player-submit-button');
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({ ok: true }));
    fireEvent.click(deleteButton);
  });
});
