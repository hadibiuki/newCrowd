import { action } from '@storybook/addon-actions';
import NavLink from 'ui/navLink/NavLink.vue';

export default {
  argTypes: {},
  component: NavLink,
  tags: ['autodocs'],
  title: 'components/NavLink',
};

const Template = args => ({
  components: { NavLink },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<NavLink @click="action" v-bind="args">
    <template #meta>${args.meta}</template>
  </NavLink>`,
});

export const WithMeta = Template.bind({});

WithMeta.args = {
  icon: 'GridLayout',
  label: 'عنوان آیتم',
  meta: `<div class="text-text-soft">(2)</div>`,
};

export const Default = {
  args: {
    icon: 'GridLayout',
    label: 'عنوان آیتم',
  },
};

export const WithoutIcon = {
  args: {
    label: 'عنوان آیتم',
  },
};

export const WithoutLabel = {
  args: {
    icon: 'GridLayout',
  },
};

export const WithoutArrow = {
  args: {
    arrow: false,
    icon: 'GridLayout',
    label: 'عنوان آیتم',
  },
};

export const Active = {
  args: {
    active: true,
    icon: 'GridLayout',
    label: 'عنوان آیتم',
  },
};

export const Loading = {
  args: {
    icon: 'GridLayout',
    label: 'عنوان آیتم',
    loading: true,
  },
};
