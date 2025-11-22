import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'natours',
    themes: {
      natours: {
        dark: false,
        colors: {
          primary: '#55c57a',
          'primary-darken-1': '#28b487',
          'primary-lighten-1': '#7dd56f',
          secondary: '#777',
          'secondary-darken-1': '#444',
          'secondary-lighten-1': '#f7f7f7',
          error: '#eb4d4b',
          info: '#2196F3',
          success: '#20bf6b',
          warning: '#ff7730',
          background: '#f7f7f7',
          surface: '#ffffff',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
      class: 'text-none',
    },
    VCard: {
      elevation: 2,
      rounded: 'lg',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
});
