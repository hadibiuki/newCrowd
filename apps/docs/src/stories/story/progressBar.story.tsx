import ProgressBar from 'ui/progressBar/ProgressBar.vue';

export default {
  argTypes: {},
  component: ProgressBar,
  tags: ['autodocs'],
  title: 'components/Progressbar',
};

export const Default = {
  args: {
    label: 'در حال آپلود Filename.png',
  },
};

export const WithPercent = {
  args: {
    label: 'در حال آپلود Filename.png',
    percent: 50,
  },
};

export const WithoutLabel = {
  args: {
    percent: 50,
  },
};

export const WithoutProgress = {
  args: {
    progress: false,
  },
};

export const SmallSize = {
  args: {
    progress: false,
    size: 'small',
  },
};
