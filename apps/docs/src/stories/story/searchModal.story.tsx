import SearchModal from 'ui/searchModal/SearchModal.vue';
import { ref } from 'vue';

export default {
  argTypes: {
    click: {
      action: 'click',
    },
  },
  component: SearchModal,
  tags: ['autodocs'],
  title: 'components/SearchModal',
};
let showValue;
const Template = args => ({
  components: { SearchModal },
  setup() {
    const value = ref(false);
    const handleChange = () => {
      value.value = false;
    };

    return { args, handleChange, value };
  },
  template: `

      <div>
      <button @click="value = true">45454</button>
      <SearchModal v-bind="args" @submit="handleChange" :show="value" @close="value = false"/>
      </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  placeholder: 'جستجو در تراکنش‌ها',
  rows: [
    {
      helper: 'لیست تراکنش‌ها',
      label: 'لیست تراکنش‌ها',
      value: 'list',
    },
    {
      helper: 'متن راهنما',
      label: 'جستجو در تراکنش‌ها',
      value: 'search',
    },
    {
      helper: '',
      label: 'جستجو در تراکنش‌ها',
      value: 'search',
    },
    {
      helper: 'جستجو در تراکنش‌ها',
      label: 'جستجو در تراکنش‌ها',
      value: 'search',
    },
    {
      helper: 'جستجو در تراکنش‌ها',
      label: 'جستجو در تراکنش‌ها',
      value: 'search',
    },
  ],
  show: showValue,
};
