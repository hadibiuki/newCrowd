/** @type { import('@storybook/vue3').Preview } */
import { Preview, setup } from '@storybook/vue3'
import i18n from './i18n'
import '../src/index.css';


setup(app => {
  app.use(i18n)
})

const customViewports = {
  xs: {
    name: 'Mini',
    styles: {
      width: "220px",
      height:'500px'
    }
  },
  md: {
    name: 'Medium',
    styles: {
      width: '768px',
      height: '1200px',
    },
  },
  lg: {
    name: 'Large',
    styles: {
      width: '992px',
      height: '1200px',
    },
  },
  xl: {
    name: 'xLarge',
    styles: {
      width: '1200px',
      height: '1200px',
    },
  },
  "2xl": {
    name: '2xLarge',
    styles: {
      width: '1456px',
      height: '1200px',
    },
  },
  iphone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  iphone12: {
    name: 'iPhone 12',
    styles: {
      width: '390px',
      height: '844px',
    },
  },

  iphone12promax: {
    name: 'iPhone 12 Pro Max',
    styles: {
      width: '428px',
      height: '926px',
    },
  },
  iphone12mini: {
    name: 'iPhone 12 Mini',
    styles: {
      width: '360px',
      height: '780px',
    },
  },

};

export const parameters = {
  themes: {
    clearable: false,
    default: 'Light',
    list: [
      {
        name: 'Light',
        class: ['light'],
        color: '#f5f5f5'
      },
      {
        name: 'Dark',
        class: ['dark'],
        color: '#000000'
      }
    ]
  },
  controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...customViewports,
    },
  }
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        {
          name: 'default',
          value: '#f5f5f5',
        },
        {
          name: 'dark',
          value: '#0f0f0f',
        },

        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
  },
};