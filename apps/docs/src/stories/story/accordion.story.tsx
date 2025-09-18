import { action } from '@storybook/addon-actions';
import Accordion from 'ui/accordion/Accordion.vue';

export default {
  argTypes: {},
  component: Accordion,
  tags: ['autodocs'],
  title: 'components/Accordion',
};

const Template = args => ({
  components: { Accordion },
  data: () => ({ args }),
  methods: { action: action('clicked') },
  template: `<Accordion v-bind="args">
    <template #content>${args.content}</template>
  </Accordion>`,
});

export const WithSlot = Template.bind({});

WithSlot.args = {
  content: `<div class="text-text-soft">example content</div>`,
  icon: 'GridLayout',
  label: 'عنوان آیتم',
};

export const Default = {
  args: {
    content: 'متن',
    label: 'عنوان آیتم',
  },
};

export const StartIcon = {
  args: {
    content: 'متن',
    iconPosition: 'start',
    label: 'عنوان آیتم',
  },
};

export const StartActive = {
  args: {
    active: true,
    content: 'متن',
    iconPosition: 'start',
    label: 'عنوان آیتم',
  },
};

export const EndActive = {
  args: {
    active: true,
    content: 'متن',
    label: 'عنوان آیتم',
  },
};

export const Disabled = {
  args: {
    content: 'متن',
    disabled: true,
    label: 'عنوان آیتم',
  },
};
