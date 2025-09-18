import Icon from 'ui/icon/Icon.vue';
import { names } from 'ui/icon/iconNames';

export default {
  argTypes: {},
  component: Icon,
  tags: ['autodocs'],
  title: 'components/Icons',
};

const Template = args => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `
            <div class="bg-gray-100 dark:bg-gray-dark-100 p-lg rounded-md flex flex-wrap rtl gap-x-md gap-y-lg" v-bind="args">
                <div v-for="name in args.names" :key="name" class="w-[18.6%]">
                    <div class="text-center flex flex-col items-center bg-surface h-[150px] rounded-md py-xl px-md dark:text-surface dark:bg-surface-dark">
                        <Icon :name="name" width="32" height="32"/>
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
