import { action } from '@storybook/addon-actions';
import Button from 'ui/button/Button.vue';
import Modal from 'ui/modal/Modal.vue';

export default {
  argTypes: {
    click: {
      action: 'click',
    },
  },
  component: Modal,
  tags: ['autodocs'],
  title: 'components/Modal',
};

const Template = args => ({
  components: { Button, Modal },
  methods: { action: action('close Modal') },
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2" v-bind="args">
      <Button text="باز کردن"/>
      <Modal show="${args.show}"  v-bind="args" text="${args.text}" @close="action">
      <template #main>${args.main}</template>
      <template #footer>${args.footer}</template>
      </Modal>
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
const TemplateWithoutHead = args => ({
  components: { Button, Modal },
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2" v-bind="args">
      <Button text="باز کردن"/>
      <Modal show="${args.show}"  v-bind="args" text="${args.text}">
      <template #main>${args.main}</template>
      <template #footer>${args.footer}</template>
      </Modal>
    </div>
  `,
});
export const WithoutHead = TemplateWithoutHead.bind({});
WithoutHead.args = {
  closeIcon: true,
  footer: 'بخش آخر',
  main: 'بخش اصلی',
  show: true,
  text: 'عنوان',
  title: 'پشتیبانی زرین‌پال',
};

const TemplateWithoutFooter = args => ({
  components: { Button, Modal },
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2" v-bind="args">
      <Button text="باز کردن"/>
      <Modal show="${args.show}"  v-bind="args" text="${args.text}">
      <template #main>${args.main}</template>
      </Modal>
    </div>
  `,
});

export const WithoutFooter = TemplateWithoutFooter.bind({});
WithoutFooter.args = {
  closeIcon: true,
  footer: 'بخش آخر',
  header: true,
  main: 'بخش اصلی',
  show: true,
  text: 'عنوان',
  title: 'پشتیبانی زرین‌پال',
};

export const OutsideClickFalse = Template.bind({});
OutsideClickFalse.args = {
  closeIcon: true,
  footer: 'بخش آخر',
  header: true,
  main: 'بخش اصلی',
  outsideClick: false,
  show: true,
  text: 'عنوان',
  title: 'پشتیبانی زرین‌پال',
};
