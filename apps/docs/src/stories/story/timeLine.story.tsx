import TimeLine from 'ui/timeLine/TimeLine.vue';

export default {
  argTypes: {},
  component: TimeLine,
  tags: ['autodocs'],
  title: 'components/TimeLine',
};

const Template = args => ({
  components: { TimeLine },
  methods: {},
  setup() {
    return { args };
  },
  template: `
      <div class="h-1/2 flex" v-bind="args">
        <div class="flex flex-col m-lg w-[336px]">
            <TimeLine
                v-for="item in ${args.count}"
                :key="item"
                :is-first="item == 1"
                :is-last="item == ${args.count}"
                icon="${args.icon}"
                title="${args.title}"
                caption="${args.caption}"
                sub-title="${args.subTitle}"
                linkButton="${args.linkButton}"
                iconClass="${args.iconClass}"
                :loading="${args.loading}"
            >
            </TimeLine>
        </div>
      </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
  caption: 'تاریخ و ساعت',
  count: 3,
  icon: 'Warning',
  iconClass: 'text-grey-500',
  linkButton: 'لینک',
  loading: false,
  subTitle: 'زیرنویس',
  title: 'عنوان رویداد',
};
