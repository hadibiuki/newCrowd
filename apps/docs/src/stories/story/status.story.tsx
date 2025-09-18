import Status from 'ui/status/Status.vue';

export default {
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['informative', 'negative', 'neutral', 'positive', 'warning'],
    },
  },
  component: Status,
  tags: ['autodocs'],
  title: 'components/Status',
};

export const Default = {
  args: { icon: 'AtSign', text: 'متن', type: 'neutral' },
};

export const WithDot = {
  args: { dot: true, text: 'متن', type: 'neutral' },
};

export const OnlyText = {
  args: { text: 'متن', type: 'neutral' },
};

export const OnlyIcon = {
  args: { icon: 'AtSign', type: 'neutral' },
};
