import { action } from '@storybook/addon-actions';
import ActionButton from 'ui/actionButton/ActionButton.vue';

export default {
  argTypes: {},
  component: ActionButton,
  tags: ['autodocs'],
  title: 'components/ActionButton',
};

const Template = args => ({
  components: { ActionButton },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<ActionButton v-bind="args" />`,
});

export const Default = Template.bind({});

Default.args = {
  content: 'content',
  placeholder: 'ddd',
  value: 'ddjd',
};
