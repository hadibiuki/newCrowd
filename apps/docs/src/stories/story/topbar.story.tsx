import Button from 'ui/button/Button.vue';
import Logo from 'ui/logo/Logo.vue';
import Tooltip from 'ui/tooltip/Tooltip.vue';
import Topbar from 'ui/topbar/Topbar.vue';

export default {
  component: Topbar,
  title: 'Components/Topbar',
};

const TemplateDefault = args => ({
  components: { Button, Logo, Tooltip, Topbar },
  setup() {
    return { args };
  },
  template: `
    <div>
      <Topbar v-bind="args">
        <template #startSection> ${args.startSection} </template>
        <template #endSection> ${args.endSection} </template>
        <template #centerSection> ${args.centerSection} </template>
      </Topbar>
    </div>
  `,
});

export const Default = TemplateDefault.bind({});

Default.args = {
  centerSection: ``,
  endSection: `
    <div>
      <Logo class="mx-xs" name="zarinpalFaLight" />
      <Button icon="MenuBurger" type="tertiary" />
    </div>
  `,
  startSection: `
    <div class="flex gap-2xs">
      <Button icon="MenuBurger" type="tertiary" />
      <Tooltip text="اعلانات">
        <Button icon="Notification" type="tertiary" />
      </Tooltip>
      <Button icon="MenuBurger" type="tertiary" />
    </div>
  `,
};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=435-27979&mode=dev',
  },
};
const TemplateCenter = args => ({
  components: { Button, Logo, Tooltip, Topbar },
  setup() {
    return { args };
  },
  template: `
    <div>
      <Topbar v-bind="args">
        <template #startSection> ${args.startSection} </template>
        <template #endSection> ${args.endSection} </template>
        <template #centerSection> ${args.centerSection} </template>
      </Topbar>
    </div>
  `,
});

export const Center = TemplateCenter.bind({});

Center.args = {
  centerSection: `
     <Logo class="mx-xs" name="zarinpalFaLight" />
  `,
  endSection: '',
  startSection: '',
};
Center.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=435-27979&mode=dev',
  },
};
