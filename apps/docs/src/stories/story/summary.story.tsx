import { action } from '@storybook/addon-actions';
import Summary from 'ui/summary/Summary.vue';

export default {
  argTypes: {},
  component: Summary,
  tags: ['autodocs'],
  title: 'components/Summary',
};

const Template = args => ({
  components: { Summary },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<Summary v-bind="args"/>`,
});

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      description: 'توضیحات',
      icon: 'Plus',
      id: 1,
      title: 'مبلغ واریزی به حساب',
      value: '100000 ریال',
    },
    {
      description: 'توضیحات',
      icon: 'Plus',
      id: 2,
      title: 'مبلغ واریزی به حساب',
      value: '100000 ریال',
    },
  ],
};
