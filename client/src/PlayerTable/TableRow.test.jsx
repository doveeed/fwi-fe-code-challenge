import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithStore } from '../test/utils';
import TableRow from './TableRow';

describe('TableRow', () => {
  it('should render TableRow and open the menu options', async () => {
    const { findByTestId } = renderWithStore(
      <table>
        <tbody>
          <TableRow
            player={{
              id: 'player1',
              name: 'Test',
              country: 'US',
              winnings: 10000,
              imageUrl: 'https://test.com',
            }}
          />
        </tbody>
      </table>,
      {}
    );

    const menu = await findByTestId('menu-player');
    expect(menu).toBeInTheDocument();

    fireEvent.click(menu);

    const deleteOption = await findByTestId('menu-delete-player');
    fireEvent.click(deleteOption);

    fireEvent.click(menu);

    const modifyOption = await findByTestId('menu-modify-player');
    fireEvent.click(modifyOption);
    deleteOption;
  });
});
