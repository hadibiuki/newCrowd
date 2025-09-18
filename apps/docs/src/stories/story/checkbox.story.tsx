import Checkbox from 'ui/checkbox/Checkbox.vue';
import { ref } from 'vue';

export default {
  argTypes: {},
  component: Checkbox,
  tags: ['autodocs'],
  title: 'components/Checkbox',
};

const modelValue = ref(true);
const Template = args => ({
  components: { Checkbox },
  data: () => ({ args, modelValue }),
  template: `<Checkbox v-model="modelValue" v-bind="args"/>`,
});
export const Default = Template.bind({});
export const Disabled = Template.bind({});
export const Loading = Template.bind({});

Default.args = {
  label: 'لیبل 1',
  name: 'checkbox',
};

Disabled.args = {
  disabled: true,
  label: 'لیبل 1',
  name: 'checkbox',
};

Loading.args = {
  label: 'لیبل 1',
  loading: true,
  name: 'checkbox',
};
