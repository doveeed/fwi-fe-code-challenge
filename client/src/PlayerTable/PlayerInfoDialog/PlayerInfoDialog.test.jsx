import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../test/utils';
import PlayerInfoDialog from './PlayerInfoDialog';

describe('PlayerInfoDialog', () => {
  it('should render PlayerInfoDialog and handle invalid submit blank inputs', async () => {
    const state = {
      playerInfoDialog: {
        open: true,
        onSubmit: jest.fn(),
      },
    };

    const { findByTestId, findByText } = renderWithStore(
      <PlayerInfoDialog />,
      state
    );

    const dialog = await findByTestId('player-info-dialog');
    expect(dialog).toBeInTheDocument();
    const submitButton = await findByTestId('player-info-dialog-submit-button');

    fireEvent.click(submitButton);
    expect(state.playerInfoDialog.onSubmit).not.toHaveBeenCalled();
  });

  it('should render PlayerInfoDialog and handle valid submit', async () => {
    const state = {
      playerInfoDialog: {
        open: true,
        onSubmit: jest.fn(),
      },
    };

    const { findByTestId } = renderWithStore(<PlayerInfoDialog />, state);

    const dialog = await findByTestId('player-info-dialog');
    expect(dialog).toBeInTheDocument();

    const nameInput = await findByTestId('player-info-name-input');
    const countryInput = await findByTestId('player-info-country-input');
    const winningsInput = await findByTestId('player-info-winnings-input');
    const imageUrlInput = await findByTestId('player-info-image-url-input');
    const submitButton = await findByTestId('player-info-dialog-submit-button');

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.blur(nameInput);
    fireEvent.change(countryInput, { target: { value: 'US' } });
    fireEvent.blur(countryInput);
    fireEvent.change(winningsInput, { target: { value: '10000' } });
    fireEvent.blur(winningsInput);
    fireEvent.change(imageUrlInput, { target: { value: 'https://test.com' } });
    fireEvent.blur(imageUrlInput);
    fireEvent.click(submitButton);

    expect(state.playerInfoDialog.onSubmit).toHaveBeenCalled();
  });

  it('should render PlayerInfoDialog and handle invalid submit, invalid values', async () => {
    const state = {
      playerInfoDialog: {
        open: true,
        player: {
          name: 'Test',
          country: 'US',
          winnings: 10000,
          imageUrl: 'http://test.com',
        },
        onSubmit: jest.fn(),
      },
    };

    const { findByTestId } = renderWithStore(<PlayerInfoDialog />, state);

    const dialog = await findByTestId('player-info-dialog');
    expect(dialog).toBeInTheDocument();

    const nameInput = await findByTestId('player-info-name-input');
    const countryInput = await findByTestId('player-info-country-input');
    const winningsInput = await findByTestId('player-info-winnings-input');
    const imageUrlInput = await findByTestId('player-info-image-url-input');
    const submitButton = await findByTestId('player-info-dialog-submit-button');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);
    fireEvent.change(countryInput, { target: { value: '' } });
    fireEvent.blur(countryInput);
    fireEvent.change(winningsInput, { target: { value: '' } });
    fireEvent.blur(winningsInput);
    fireEvent.change(imageUrlInput, { target: { value: 'invalid url' } });
    fireEvent.blur(imageUrlInput);
    fireEvent.change(imageUrlInput, { target: { value: '' } });
    fireEvent.blur(imageUrlInput);
    fireEvent.click(submitButton);

    expect(state.playerInfoDialog.onSubmit).not.toHaveBeenCalled();
  });
});
