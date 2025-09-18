import { action } from '@storybook/addon-actions';
import Button from 'ui/button/Button.vue';
import Sidebar from 'ui/sidebar/Sidebar.vue';

export default {
  argTypes: {
    click: {
      action: 'click',
    },
  },
  component: Sidebar,
  tags: ['autodocs'],
  title: 'components/Sidebar',
};

const Template = args => ({
  components: { Button, Sidebar },
  methods: { action: action('close Modal') },
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2" v-bind="args">
      <Button text="باز کردن"/>
      <Sidebar show="${args.show}"  v-bind="args" text="${args.text}" @close="action">
      <template #header>${args.header}</template>
      <template #main>${args.main}</template>
      <template #footer>${args.footer}</template>
      </Sidebar>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  closeIcon: true,
  footer: 'بخش آخر',
  header: true,
  main: 'بخش اصلی',
  show: true,
  text: 'عنوان',
  title: 'پشتیبانی زرین‌پال',
};

export const WithoutClose = Template.bind({});
WithoutClose.args = {
  closeIcon: false,
  footer: 'بخش آخر',
  header: true,
  main: 'بخش اصلی',
  show: true,
  text: 'عنوان',
  title: 'پشتیبانی زرین‌پال',
};
