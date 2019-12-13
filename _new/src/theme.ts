import { createMuiTheme } from '@material-ui/core/styles';
import {  red } from '@material-ui/core/colors';


const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#018588' //DL-Colore
        },
        secondary: {
            main: '#7e57c2',
          },
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
        background: {
            paper: "#fff",

            default: "#fafafa"}
      },
  });

export default Theme