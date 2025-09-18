import Tab from 'ui/tab/Tab.vue';

export default {
  argTypes: {},
  component: Tab,
  tags: ['autodocs'],
  title: 'components/Tab',
};

export const Default = {
  args: {
    items: [
      {
        label: 'لیبل 1',
        value: '1',
      },
      {
        label: 'لیبل 2',
        value: '2',
      },
      {
        label: 'لیبل 3',
        value: '3',
      },
    ],
    modelValue: '1',
  },
};

export const WithAlign = {
  args: {
    block: false,
    items: [
      {
        isActive: true,
        label: 'لیبل 1',
        value: '1',
      },
      {
        label: 'لیبل 2',
        value: '2',
      },
      {
        label: 'لیبل 3',
        value: '3',
      },
    ],
    modelValue: '1',
  },
};

export const WithNotif = {
  args: {
    items: [
      {
        isActive: true,
        isNotif: true,
        label: 'لیبل 1',
        value: '1',
      },
      {
        label: 'لیبل 2',
        value: '2',
      },
      {
        label: 'لیبل 3',
        value: '3',
      },
    ],
    modelValue: '2',
  },
};
