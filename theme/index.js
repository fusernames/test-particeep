import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// Create a theme instance.
let theme = {}
theme.palette = {
  primary: {
    main: '#448aff',
  },
  background: {
    default: '#f8f8f8',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.8)',
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
  // action: {
  //   active: 'rgba(255, 255, 255, 0.6)',
  // },
  // type: 'dark',
}
theme.typography = {
  h1: {
    fontSize: '4rem',
    fontFamily: 'Poppins',
    fontWeight: 600,
  },
  body1: {
    fontFamily: 'Poppins',
    // fontSize: '1.2rem',
  },
  body2: {
    fontFamily: 'Poppins',
    lineHeight: '150%',
    // fontSize: '1rem',
  },
}

theme.props = {
  MuiCard: {
    raised: false,
  },
}

theme.overrides = {
  MuiCard: {
    root: {
      boxShadow: 'none',
    },
  },
}
theme = responsiveFontSizes(createMuiTheme(theme))
export default theme
