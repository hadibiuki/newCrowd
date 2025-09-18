import Avatar from 'ui/avatar/Avatar.vue';
import Menu from 'ui/menu/Menu.vue';
import { h } from 'vue';

export default {
  argTypes: {},
  component: Menu,
  tags: ['autodocs'],
  title: 'components/Menu',
};

const Template = args => ({
  components: { Menu },
  data: () => ({ args }),
  template: `<div class="w-[300px]">
    <Menu v-bind="args">
      <template #activator>${args.activator}</template>
    </Menu>
  </div>`,
});
const TemplateAvatar = args => ({
  components: { Avatar, Menu },
  data: () => ({ args }),
  template: `<div class="w-[300px]">
    <Menu v-bind="args">
      <template #activator><Avatar/></template>
    </Menu>
  </div>`,
});

export const WithText = Template.bind({});

WithText.args = {
  activator: 'activator',
  content: h('p', { class: 'bg-red-100' }, 'hello'),
  position: 'right',
  trigger: 'click',
};

export const WithAvatar = TemplateAvatar.bind({});

WithAvatar.args = {
  content: h('p', { class: 'bg-red-100' }, 'hello'),
  position: 'right',
  trigger: 'click',
};
