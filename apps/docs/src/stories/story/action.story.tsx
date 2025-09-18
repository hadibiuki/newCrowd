import Action from 'ui/action/Action.vue';

export default {
  argTypes: {},
  component: Action,
  tags: ['autodocs'],
  title: 'components/Action',
};

const Template = args => ({
  components: { Action },
  data: () => ({ args }),
  template: `<Action v-bind="args" />`,
});

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      active: true,
      command: () => {
        alert('clicked1');
      },
      divider: true,
      icon: 'Bill',
      id: 1,
      label: 'کدهای تخفیف',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked2');
      },
      icon: 'AlarmTime',
      id: 2,
      label: 'فروش',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      id: 3,
      label: 'محصولات',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      icon: 'Plus',
      id: 3,
      label: 'مدیریت کد‌ها',
      style: '',
    },
  ],
  limit: 4,
};

export const WithoutIcon = Template.bind({});

WithoutIcon.args = {
  items: [
    {
      active: true,
      command: () => {
        alert('clicked1');
      },
      id: 1,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked2');
      },
      id: 2,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      id: 3,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      icon: 'Plus',
      id: 3,
      label: 'Action',
      style: '',
    },
  ],
  limit: 4,
};
export const WithLimit = Template.bind({});

WithLimit.args = {
  items: [
    {
      active: true,
      command: () => {
        alert('clicked1');
      },
      icon: 'Bill',
      id: 1,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked2');
      },
      icon: 'AlarmTime',
      id: 2,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      id: 3,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      icon: 'Plus',
      id: 3,
      label: 'Action',
      style: '',
    },
  ],
  limit: 1,
};

export const Inactive = Template.bind({});

Inactive.args = {
  items: [
    {
      active: true,
      command: () => {
        alert('clicked1');
      },
      icon: 'Bill',
      id: 1,
      label: 'Action',
      style: '',
    },
    {
      active: false,
      command: () => {
        alert('clicked2');
      },
      icon: 'AlarmTime',
      id: 2,
      label: 'Action',
      style: '',
    },
    {
      active: false,
      command: () => {
        alert('clicked3');
      },
      id: 3,
      label: 'Action',
      style: '',
    },
    {
      active: true,
      command: () => {
        alert('clicked3');
      },
      icon: 'Plus',
      id: 3,
      label: 'Action',
      style: '',
    },
  ],
  limit: 2,
};

export const CustomStyle = Template.bind({});

CustomStyle.args = {
  items: [
    {
      active: true,
      command: () => {
        alert('clicked1');
      },
      icon: 'Bill',
      id: 1,
      label: 'Action',
      style: { background: 'red', color: 'white' },
    },
    {
      active: true,
      command: () => {
        alert('clicked2');
      },
      icon: 'AlarmTime',
      id: 2,
      label: 'Action',
      style: 'color:red',
    },
  ],
  limit: 4,
};
