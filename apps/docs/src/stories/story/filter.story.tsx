import { action } from '@storybook/addon-actions';
import Filter from 'ui/filter/Filter.vue';

export default {
  argTypes: {},
  component: Filter,
  tags: ['autodocs'],
  title: 'components/Filter',
};

const Template = args => ({
  components: { Filter },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<Filter @clear="action" v-bind="args" />`,
});

export const WithEmit = Template.bind({});

WithEmit.args = {
  content: 'باکس دراپ داون',
  placeholder: 'عنوان فیلتر',
  value: 'عنوان: فیلتر',
};

export const Default = {
  args: {
    content: 'باکس دراپ داون',
    placeholder: 'عنوان فیلتر',
    value: '',
  },
};

export const WithValue = {
  args: {
    content: 'باکس دراپ داون',
    placeholder: 'عنوان فیلتر',
    value: 'عنوان: فیلتر',
  },
};
