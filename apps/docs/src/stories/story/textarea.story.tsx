import Textarea from 'ui/textarea/Textarea.vue';

export default {
  argTypes: {},
  component: Textarea,
  tags: ['autodocs'],
  title: 'components/Input',
};

export const TextArea = {
  args: {
    disabled: false,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
  },
};
