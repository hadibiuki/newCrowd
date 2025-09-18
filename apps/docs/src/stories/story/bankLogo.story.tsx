import BankLogo from 'ui/bankLogo/BankLogo.vue';
import { names } from 'ui/bankLogo/bankLogoNames';

export default {
  argTypes: {},
  component: BankLogo,
  tags: ['autodocs'],
  title: 'components/BankLogo',
};

const Template = args => ({
  components: { BankLogo },
  setup() {
    return { args };
  },
  template: `
            <div class="bg-gray-100 dark:bg-gray-dark-100 p-lg rounded-md flex flex-wrap rtl gap-x-md gap-y-lg" v-bind="args">
                <div v-for="name in args.names" :key="name" class="w-[18.6%]">
                    <div class="text-center flex flex-col items-center bg-grey h-[100px] rounded-md dark:text-surface dark:bg-surface-dark">
                        <BankLogo :name="name"/>
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
