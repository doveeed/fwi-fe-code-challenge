import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithStore } from '../../test/utils';
import CreatePlayerButton from './CreatePlayerButton';

describe('CreatePlayerButton', () => {
  it('should render CreatePlayerButton and handle clicks', async () => {
    const { findByTestId } = renderWithStore(<CreatePlayerButton />, {
      playerInfoDialog: {},
    });

    const createPlayerButtonRelative = await findByTestId(
      'create-player-button-relative'
    );
    const createPlayerButtonFixed = await findByTestId(
      'create-player-button-fixed'
    );

    expect(createPlayerButtonRelative).toBeInTheDocument();
    expect(createPlayerButtonFixed).toBeInTheDocument();

    fireEvent.click(createPlayerButtonRelative);
  });
});
