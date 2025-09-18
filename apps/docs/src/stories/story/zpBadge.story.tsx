import ZpBadge from 'ui/zpBadge/ZpBadge.vue';

export default {
  argTypes: {},
  component: ZpBadge,
  tags: ['autodocs'],
  title: 'components/ZpBadge',
};

const Template = args => ({
  components: { ZpBadge },
  methods: {},
  setup() {
    return { args };
  },
  template: `
      <div class="h-1/2 flex bg-gray-100" v-bind="args">
        <div class="flex flex-col gap-sm m-lg w-[336px]">
            <ZpBadge level="GOLD" id="36515"/>
            <ZpBadge level="SILVER" id="4521"/>
            <ZpBadge level="NEW" id="23654"/>
            <ZpBadge level="BLUE" id="23654"/>
        </div>
      </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
  id: 21564,
  level: 'BASIC',
};
