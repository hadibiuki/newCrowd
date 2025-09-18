import Switch from 'ui/switch/Switch.vue';

export default {
  argTypes: {},
  component: Switch,
  tags: ['autodocs'],
  title: 'components/Switch',
};

export const Default = {
  args: {
    checked: false,
  },
};
export const Checked = {
  args: {
    checked: true,
  },
};
export const DisabledChecked = {
  args: {
    checked: true,
    disabled: true,
  },
};
export const Disabled = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const WithLabel = {
  args: {
    checked: false,
    disabled: false,
    label: 'لبیل',
  },
};

export const WithLabelDisabled = {
  args: {
    checked: false,
    disabled: true,
    label: 'لبیل',
  },
};

export const WithLoading = {
  args: {
    checked: false,
    disabled: true,
    loading: true,
  },
};
