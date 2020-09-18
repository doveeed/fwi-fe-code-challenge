import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';

export const renderWithStore = (component, state) => {
  const store = configureStore()(state);
  return render(<Provider store={store}>{component}</Provider>);
};
