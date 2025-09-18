import Button from 'ui/button/Button.vue';
import EmptyState from 'ui/emptyState/emptyState.vue';

export default {
  argTypes: {},
  component: EmptyState,
  tags: ['autodocs'],
  title: 'components/EmptyState',
};

const Template = args => ({
  components: { Button, EmptyState },
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2" v-bind="args">
      <EmptyState title="${args.title}" description="${args.description}" vector="${args.vector}">
        <template #action>
          <div class="flex gap-xs justify-center">
          <Button text="دکمه" />
          <Button text="دکمه" />
          </div>
        </template>
      </EmptyState>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  description: 'تراکنش های شما به صورت لحظه ای در این صفحه قابل مشاهده است',
  title: 'پشتیبانی زرین‌پال',
  vector: 'ProductPaymentLink',
};
