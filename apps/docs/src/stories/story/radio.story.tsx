import Radio from 'ui/radio/Radio.vue';

export default {
  argTypes: {},
  component: Radio,
  tags: ['autodocs'],
  title: 'components/Radio',
};

export const Default = {
  args: {
    label: 'رادیو باتن',
  },
};
export const Disabled = {
  args: {
    disabled: true,
    label: 'رادیو باتن',
  },
};

export const ChekedWithDisabled = {
  args: {
    checked: true,
    disabled: true,
    label: 'رادیو باتن',
  },
};

export const WithLoading = {
  args: {
    checked: true,
    disabled: true,
    label: 'رادیو باتن',
    loading: true,
  },
};
