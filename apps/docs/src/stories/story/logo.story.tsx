import Logo from 'ui/logo/Logo.vue';

export default {
  argTypes: {
    name: {
      control: 'select',
      options: [
        'zarinpalEnDark',
        'zarinpalEnLight',
        'zarinpalFaDark',
        'zarinpalFaLight',
        'zarinpalTypeEnDark',
        'zarinpalTypeEnLight',
        'zarinpalFaDark',
        'zarinpalFaLight',
      ],
    },
  },
  component: Logo,
  tags: ['autodocs'],
  title: 'components/Logo',
};
const Template = args => ({
  components: { Logo },
  setup() {
    return { args };
  },
  template: `
            <div class="bg-gray-100 dark:bg-gray-dark-100 p-lg rounded-md  flex-wrap rtl gap-x-md gap-y-lg flex justify-center">
                <div>
                   <Logo v-bind="args"/>
                </div>
            </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  name: 'zarinpalEnLight',
};
