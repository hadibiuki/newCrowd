import Button from 'ui/button/Button.vue';
import Card from 'ui/card/Card.vue';

export default {
  component: Card,
  title: 'Components/Card',
};

const TemplateDefault = args => ({
  components: { Button, Card },
  setup() {
    return { args };
  },
  template: `
    <div>
      <Card v-bind="args">
        <template #header> ${args.header} </template>
        <template #main> ${args.main} </template>
        <template #footer> ${args.footer} </template>
      </Card>
    </div>
  `,
});

export const Default = TemplateDefault.bind({});

Default.args = {
  footer: `
    <div class="flex gap-2xs">
      <Button text="test" block/>
    </div>
  `,
  header: `
  <div>
    <Button icon="UserCircle"/>
  </div>`,
  main: `
    <div>
      <Button icon="Refund"/>
    </div>
  `,
};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?node-id=3715%3A97503&mode=dev',
  },
};
