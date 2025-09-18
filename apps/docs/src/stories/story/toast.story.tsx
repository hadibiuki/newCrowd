import { action } from '@storybook/addon-actions';
import Button from 'ui/button/Button.vue';
import Icon from 'ui/icon/Icon.vue';
import Toast from 'ui/toast/Toast.vue';

export default {
  argTypes: {
    OpenToast: {},
  },
  component: Toast,
  tags: ['autodocs'],
  title: 'components/Toast',
};

const Template = args => ({
  components: { Button, Icon, Toast },
  methods: { action: action('open-toast') },
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2" v-bind="args">
      <Button text="نمایش" @click="action"/>
      <Toast :show="${args.show}"  v-bind="args">
        <template #default>
          <div class="flex items-center">
            <Icon name="CheckmarkCircle" class="text-green-500 w-[20px] h-[20px]"/>
            <span class="mx-[4px] text-body-400-b3">${args.content}</span>
          </div>
        </template>
      </Toast>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  close: true,
  content: 'با موفقیت انجام شد',
  show: false,
};

export const OpenToast = {
  args: {
    close: true,
    content: 'با موفقیت انجام شد',
    show: false,
  },
};
