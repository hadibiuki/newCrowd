import Avatar from 'ui/avatar/Avatar.vue';

export default {
  argTypes: {
    shape: {
      control: 'inline-radio',
      options: ['square', 'rounded'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  component: Avatar,
  tags: ['autodocs'],
  title: 'components/Avatar',
};

const Template = args => ({
  components: { Avatar },
  setup() {
    return { args };
  },
  template: ` <Avatar @click="console.log('clicked')" class="cursor-pointer" /> `,
});

export const WithClick = Template.bind({});

export const Default = {
  args: {},
};
export const WithImage = {
  args: {
    src: 'https://logoland.zarinpal.com/9a51608e745145588bb4d8a7cd145432/128x128.png',
  },
};
export const WithSvg = {
  args: {
    src: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg',
  },
};
