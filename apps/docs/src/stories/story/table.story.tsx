import Skeleton from 'ui/skeleton/Skeleton.vue';
import Status from 'ui/status/Status.vue';
import Table from 'ui/table/table.vue';

export default {
  component: Table,
  title: 'Components/Table',
};

const TemplateDefault = args => ({
  components: { Skeleton, Status, Table },
  setup() {
    return { args };
  },
  template: `
    <div>
      <Table v-bind="args">
        <template #column-id="header">
          <Status text="id" type="neutral" />
        </template>
        <template #item-action="item">
          <Status text="id" type="neutral" />
        </template>
        <template #loadingSkeleton>
          <div
            class="root__row--default"
            style="'grid-template-columns': 100px 1fr 300px 1fr 1fr"
          >
            <div class="root__row__rows">
            <Skeleton :width="300" :height="30" class="py-2xl px-2xl"/>
            </div>
          </div>
        </template>
      </Table>
    </div>
  `,
});

export const Default = TemplateDefault.bind({});

Default.args = {
  columns: [
    {
      class: '',
      id: '1',
      label: 'شناسه',
      name: 'id',
      width: '100px',
    },
    {
      id: '2',
      label: 'عنوان',
      name: 'label',
    },
    {
      id: '3',
      label: 'وضعیت',
      name: 'status',
      width: '300px',
    },
    {
      id: '4',
      label: 'تاریخ',
      name: 'date',
    },
    {
      id: '5',
      label: 'عملیات',
      name: 'action',
    },
  ],
  items: [
    {
      date: 'action',
      id: '1',
      label: 'عنوان تیکت ۱',
      status: 'ddd',
    },
    {
      date: 'action',
      id: '2',
      label: 'عنوان تیکت 2',
      status: 'ddd',
    },
    {
      date: 'action',
      id: '3',
      label: 'عنوان تیکت 3',
      status: 'ddd',
    },
    {
      date: 'action',
      id: '4',
      label: 'عنوان تیکت 4۱',
      status: 'ddd',
    },
  ],
  onClickRow: item => console.log(item),
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=1116-39488&mode=dev',
  },
};

export const Loading = TemplateDefault.bind({});

Loading.args = {
  columns: [
    {
      class: '',
      id: '1',
      label: 'شناسه',
      name: 'id',
      width: '100px',
    },
    {
      id: '2',
      label: 'عنوان',
      name: 'label',
    },
    {
      id: '3',
      label: 'وضعیت',
      name: 'status',
      width: '300px',
    },
    {
      id: '4',
      label: 'تاریخ',
      name: 'date',
    },
    {
      id: '5',
      label: 'عملیات',
      name: 'action',
    },
  ],
  items: [
    {
      date: 'action',
      id: '1',
      label: 'عنوان تیکت ۱',
      status: 'ddd',
    },
    {
      date: 'action',
      id: '2',
      label: 'عنوان تیکت 2',
      status: 'ddd',
    },
    {
      date: 'action',
      id: '3',
      label: 'عنوان تیکت 3',
      status: 'ddd',
    },
    {
      date: 'action',
      id: '4',
      label: 'عنوان تیکت 4۱',
      status: 'ddd',
    },
  ],
  loading: true,
};

Loading.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=1116-39488&mode=dev',
  },
};
