import pspLogo from 'ui/pspLogo/PspLogo.vue';
import { names } from 'ui/pspLogo/pspLogoNames';

export default {
  argTypes: {},
  component: pspLogo,
  tags: ['autodocs'],
  title: 'components/pspLogo',
};

const Template = args => ({
  components: { pspLogo },
  setup() {
    return { args };
  },
  template: `
            <div class=" dark:bg-gray-dark-100 p-lg rounded-md flex flex-wrap rtl gap-x-md gap-y-lg" v-bind="args">
                <div v-for="name in args.names" :key="name" class="w-[18.6%]">
                    <div class="text-center flex flex-col items-center  h-[100px] rounded-md dark:text-surface dark:bg-surface-dark">
                        <pspLogo :name="name" />
                        <span class="text-caption-400-c1 m-[10px]"> {{name}} </span>
                    </div>
                </div>
            </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  names: names,
};
