import InlineMessage from 'ui/inlineMessage/InlineMessage.vue';

export default {
  component: InlineMessage,
  tags: ['autodocs'],
  title: 'Components/InlineMessage',
};
const Template = args => ({
  components: { InlineMessage },
  setup() {
    return { args };
  },
  template: `
  <div>
 
  <InlineMessage title="عنوان" type="neutral" />
  <InlineMessage title="عنوان" type="informative" />
  <InlineMessage title="عنوان" type="warning" />
  <InlineMessage title="عنوان" type="negative" />
  <InlineMessage title="عنوان" type="positive" />
 
</div>
  `,
});
export const Default = Template.bind({});
Default.args = {
  description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ ',
  title: 'عنوان',
  toggle: true,
  type: 'neutral',
};
