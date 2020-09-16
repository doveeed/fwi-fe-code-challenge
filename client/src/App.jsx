import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <PlayerTable />
    </ThemeProvider>
  );
};

export default App;
