import Illustration from 'ui/illustration/Illustration.vue';
import { names } from 'ui/illustration/illustrationNames';

export default {
  argTypes: {},
  component: Illustration,
  tags: ['autodocs'],
  title: 'components/Illustration',
};

const Template = args => ({
  components: { Illustration },
  setup() {
    return { args };
  },
  template: `
            <div class="bg-gray-100 dark:bg-gray-dark-100 p-lg rounded-md flex flex-wrap rtl gap-x-md gap-y-lg" v-bind="args">
                <div v-for="name in args.names" :key="name" class="w-[18.6%]">
                    <div class="text-center flex flex-col items-center bg-surface h-[150px] rounded-md py-xl px-md dark:text-surface dark:bg-surface-dark">
                        <Illustration :name="name" width="128" height="128"/>
                        <span> {{ name }} </span>
                    </div>
                </div>
            </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  names: names,
};
