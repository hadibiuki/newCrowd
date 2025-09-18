import Button from 'ui/button/Button.vue';
import { names } from 'ui/icon/iconNames';

export default {
  argTypes: {
    afterIcon: {
      control: 'select',
      options: names,
    },
    beforeIcon: {
      control: 'select',
      options: names,
    },
    icon: {
      control: 'select',
      options: names,
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['decretive', 'light', 'primary', 'secondary', 'tertiary'],
    },

    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'text'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'components/Button',
};

export const WithText = {
  args: {
    text: 'دکمه دریافت',
  },
};

export const OnlyIcon = {
  args: {
    icon: 'UserCircle',
  },
};
export const WithBeforeIcon = {
  args: {
    beforeIcon: 'UserCircle',
    text: 'دکمه انتخاب',
  },
};

export const WithAfterIcon = {
  args: {
    afterIcon: 'UserCircle',
    text: 'دکمه انتخاب',
  },
};

export const Outlined = {
  args: {
    afterIcon: 'UserCircle',
    text: 'دکمه انتخاب',
    variant: 'outlined',
  },
};

export const TextButton = {
  args: {
    afterIcon: 'UserCircle',
    text: 'دکمه انتخاب',
    variant: 'text',
  },
};

export const BlockButton = {
  args: {
    afterIcon: 'UserCircle',
    block: true,
    text: 'دکمه انتخاب',
  },
};
