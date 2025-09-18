import Flag from 'ui/flag/Flag.vue';
import { CountryCode } from 'ui/flag/flagNames';

export default {
  argTypes: {},
  component: Flag,
  tags: ['autodocs'],
  title: 'components/Flags',
};

const Template = args => ({
  components: { Flag },
  setup() {
    return { args };
  },
  template: `
            <div class="bg-gray-100 dark:bg-gray-dark-100 p-lg rounded-md flex flex-wrap rtl gap-x-md gap-y-lg" v-bind="args">
                <div v-for="(value, key) in args.names" :key="value" class="w-[175px]">
                    <div class="text-center flex flex-col justify-center items-center bg-surface h-[100px] rounded-md py-xl px-md dark:text-surface dark:bg-surface-dark">
                        <Flag :name="key" />
                        <span style="font-size:12px; margin-top:10px"> {{ value }} </span>
                    </div>
                </div>
            </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  names: CountryCode,
};
