import type { StorybookConfig } from '@storybook/vue3-vite';
import * as postcss from "postcss"
import path from 'path'
const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    // '@storybook/addon-a11y',
    '@storybook/addon-console',
    'storybook-addon-themes',
    '@storybook/addon-designs',
    // '@storybook/addon-styling',
    "storybook-addon-pseudo-states"
  ],
  docs: {
    autodocs: 'tag',
  },
  core: {},
  framework: {
    name: '@storybook/vue3-vite',
  },
  features: {
    storyStoreV7: true,
  },
 viteFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@date': path.resolve(__dirname, '../../../libs/date-picker/src'),
        };
		return config;
	},
}


export default config
