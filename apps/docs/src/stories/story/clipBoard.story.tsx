import ClipBoard from 'ui/clipBoard/ClipBoard.vue';

export default {
  argTypes: {},
  component: ClipBoard,
  tags: ['autodocs'],
  title: 'components/ClipBoard',
};

const Template = args => ({
  components: { ClipBoard },
  setup() {
    return { args };
  },
  template: `
  <div class="bg-white-100 w-[400px] p-lg">
   <ClipBoard 
    title="${args.title}" 
    content="${args.content}" 
    :hasArrow="${args.hasArrow}"
   />
  </div>
  `,
});
export const Default = Template.bind({});

Default.args = {
  content: 'ZARINPAL.COM',
  hasArrow: true,
  title: 'عنوان کلیپ بورد',
};
