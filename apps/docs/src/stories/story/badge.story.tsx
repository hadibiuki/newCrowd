import Badge from 'ui/badge/Badge.vue';
import Button from 'ui/button/Button.vue';

export default {
  argTypes: {},
  component: Badge,
  tags: ['autodocs'],
  title: 'components/Badge',
};

const Template = args => ({
  components: { Badge, Button },
  methods: {},
  setup() {
    return { args };
  },
  template: `
    <div class="h-1/2 flex" v-bind="args">
      <Badge>
       <template #default>
        <Button icon="Notification" type="tertiary" class="w-[40px] h-[40px]"/>
       </template>
      </Badge>
      <Badge class="mx-sm" :content="${args.content}"  v-bind="args">
       <template #default>
        <Button text="تیکت"/>
       </template>
      </Badge>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  content: '20',
};
