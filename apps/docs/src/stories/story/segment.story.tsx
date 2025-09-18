import Segment from 'ui/segment/Segment.vue';
import { ref } from 'vue';

export default {
  argTypes: {},
  component: Segment,
  tags: ['autodocs'],
  title: 'components/Segment',
};

const items = [
  {
    id: 1,
    label: 'دکمه',
  },
  {
    id: 2,
    label: 'دکمه',
  },
  {
    id: 3,
    label: 'اختیاری',
  },
];
const modelValue = ref(1);
const Template = args => ({
  components: { Segment },
  data: () => ({ args, items, modelValue }),
  template: `<Segment v-model="modelValue" :items="items"/>`,
});
export const Default = Template.bind({});
