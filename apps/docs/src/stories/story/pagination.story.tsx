import { action } from '@storybook/addon-actions';
import Pagination from 'ui/pagination/Pagination.vue';

export default {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'components/Pagination',
};

const Template = args => ({
  components: { Pagination },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<Pagination v-bind="args" />`,
});

export const Default = Template.bind({});

Default.args = {
  currentPage: 2,
  pageSize: 222,
  pages: 10,
  rows: 15,
};

export const Loading = Template.bind({});

Loading.args = {
  currentPage: 2,
  loading: true,
  pageSize: 5,
  pages: 10,
  rows: 15,
};
