import Toggle from 'ui/toggle/Toggle.vue';

export default {
  argTypes: {},
  component: Toggle,
  tags: ['autodocs'],
  title: 'components/Toggle',
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
