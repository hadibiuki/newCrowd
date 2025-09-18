import Skeleton from 'ui/skeleton/Skeleton.vue';

export default {
  argTypes: {
    radius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  component: Skeleton,
  tags: ['autodocs'],
  title: 'components/Skeleton',
};

export const Default = {
  args: { loading: true },
};

export const Circle = {
  args: {
    circle: true,
    height: 300,
    loading: true,
    width: 300,
  },
};
