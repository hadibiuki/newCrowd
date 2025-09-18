import Button from 'ui/button/Button.vue';
import Tooltip from 'ui/tooltip/Tooltip.vue';

export default {
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
    },
  },
  component: Tooltip,
  tags: ['autodocs'],
  title: 'components/Tooltip',
};

const Template = args => ({
  components: { Button, Tooltip },
  setup() {
    return { args };
  },
  template: `
    <div class="w-fit"><Tooltip v-bind="args">
			<Button text="تست محصول"/>
		</Tooltip></div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  arrow: true,
  position: 'top',
  size: 'medium',
  text: 'تست محصول',
  trigger: 'click',
};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=366-10371&mode=dev',
  },
};
