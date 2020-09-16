import { orange, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for alerts
const themeAlert = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

export default themeAlert;
