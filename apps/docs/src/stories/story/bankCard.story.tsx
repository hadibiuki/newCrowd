import BankCard from 'ui/bankcard/Bankcard.vue';

export default {
  argTypes: {},
  component: BankCard,
  tags: ['autodocs'],
  title: 'components/BankCard',
};

const Template = args => ({
  components: { BankCard },
  setup() {
    return { args };
  },
  template: ` <BankCard  v-bind="args" dir="rtl"/> `,
});
const DescriptionSlot = args => ({
  components: { BankCard },
  setup() {
    return { args };
  },
  template: `
  <BankCard  v-bind="args" dir="rtl">
    <template #description>
      <i>حساب پیش‌فرض</i>
    </template>
  </BankCard>

  `,
});
const DynamicSlot = args => ({
  components: { BankCard },
  setup() {
    return { args };
  },
  template: `
  <BankCard  v-bind="args" dir="rtl">

  </BankCard>

  `,
});

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=3956-98665&mode=dev',
  },
};

Default.args = {
  description: 'حساب پیش‌فرض تسویه',
  iban: 'IR610620000000202262605006',
  isDefault: true,
  logo: 'Ayandeh',
};

export const WithoutDefault = Template.bind({});

WithoutDefault.args = {
  description: 'حساب پیش‌فرض تسویه',
  iban: 'IR610620000000202262605006',
  isDefault: false,
  logo: 'Ayandeh',
};

export const DescriptionSlots = DescriptionSlot.bind({});

DescriptionSlots.args = {
  iban: 'IR610620000000202262605006',
  isDefault: false,
  logo: 'Ayandeh',
};

export const DynamicSlots = DynamicSlot.bind({});

DynamicSlots.args = {
  description: 'حساب پیش‌فرض تسویه',
  iban: 'IR610620000000202262605006',
  isDefault: true,
  items: [
    {
      id: 1,
      label: 'سهم واریز شده',
      value: '۱۳۰٬۰۰۰ریال',
    },
    {
      id: 2,
      label: 'شناسه واریز',
      value: '۸۹۲۹۳۸۸۲۰۰۰۱۲۷۷۶۴۸',
    },
  ],
  logo: 'Ayandeh',
};

export const Loading = DynamicSlot.bind({});

Loading.args = {
  description: 'حساب پیش‌فرض تسویه',
  iban: 'IR610620000000202262605006',
  isDefault: true,
  items: [
    {
      id: 1,
      label: 'سهم واریز شده',
      value: '۱۳۰٬۰۰۰ریال',
    },
    {
      id: 2,
      label: 'شناسه واریز',
      value: '۸۹۲۹۳۸۸۲۰۰۰۱۲۷۷۶۴۸',
    },
  ],
  loading: true,
  logo: 'Ayandeh',
};
