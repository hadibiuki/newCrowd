import { action } from '@storybook/addon-actions';
import FloatButton from 'ui/floatButton/FloatButton.vue';

export default {
  argTypes: {},
  component: FloatButton,
  tags: ['autodocs'],
  title: 'components/FloatButton',
};

const Template = args => ({
  components: { FloatButton },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<div :style="{height: '200px',width: '200px',margin: 'auto'}">
  <FloatButton v-bind="args">
    <template #default>
      <div class="w-[100px] h-[100px] bg-red-500">45454</div>
    </template>
  </FloatButton>
  </div>`,
});

export const Default = Template.bind({});

Default.args = {};
