import Select from 'ui/select/Select.vue';

export default {
  argTypes: {},
  component: Select,
  tags: ['autodocs'],
  title: 'components/Input',
};

export const SelectField = {
  args: {
    afterIcon: 'AngleDown',
    data: [
      {
        icon: 'AlarmTime',
        id: 1,
      },
      {
        description: 'لورم ایپسوم متن ساختگی با تولید ',
        icon: 'BillScan',
        id: 2,
        title: 'عنوان 2',
      },
      {
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی ',
        icon: 'BillScan',
        id: 3,
      },
      {
        icon: 'Box',
        id: 4,
        title: 'عنوان 4',
      },
      {
        description: 'لورم ',
        id: 5,
        title: 'عنوان 5',
      },
      {
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ',
        disabled: true,
        id: 6,
        title: 'لورم ایپسوم متن ',
      },
      {
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم ',
        disabled: true,
        icon: 'Box',
        id: 7,
        title: 'لورم ایپسوم متن ',
      },
    ],
    name: 'entity',
    placeholder: 'تعداد',
  },
};

export const EmptySelectBox = {
  args: {
    data: [],
    name: 'entity',
    placeholder: 'تعداد',
  },
};

export const LoadingSelectBox = {
  args: {
    data: [],
    loadingBox: true,
    name: 'entity',
    placeholder: 'تعداد',
  },
};
