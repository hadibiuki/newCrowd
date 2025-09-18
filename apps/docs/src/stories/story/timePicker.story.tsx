import TimePicker from '@date/components/TimePicker.vue';
import { action } from '@storybook/addon-actions';

function exposeTime(v) {
  console.log(v);
}

export default {
  argTypes: {},
  component: TimePicker,
  tags: ['autodocs'],
  title: 'components/TimePicker',
};
const Template = args => ({
  components: { TimePicker },
  methods: { action },

  setup() {
    return { args, exposeTime };
  },
  template: `
    <div dir="rtl" class="w-[18.5rem]">
      <TimePicker v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
