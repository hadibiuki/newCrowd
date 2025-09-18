import Button from 'ui/button/Button.vue';
import Skeleton from 'ui/skeleton/Skeleton.vue';
import Status from 'ui/status/Status.vue';
import TableCard from 'ui/tableCard/TableCard.vue';

export default {
  component: TableCard,
  title: 'Components/Table',
};

const TemplateCardDefault = args => ({
  components: { Button, Skeleton, Status, TableCard },
  setup() {
    return { args };
  },
  template: `
    <div>
      <TableCard v-bind="args">
       <template #header>
       <Status text="لورم ایپسوم متن ساختگی "/>
       </template>
        <template #main>
       ${args.main}
       </template>
        <template #footer>
       <Button text="لورم ایپسوم "/>
       </template>
      </TableCard>
    </div>
  `,
});

export const DefaultTableCard = TemplateCardDefault.bind({});

DefaultTableCard.args = {
  main: 'لورم ایپسوم متن ',
};

DefaultTableCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=3817-97515&mode=dev',
  },
};
