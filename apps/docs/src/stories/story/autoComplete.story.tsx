import AutoCompleteVue from 'ui/autoComplete/AutoComplete.vue';
import Button from 'ui/button/Button.vue';

export default {
  argTypes: {},
  component: AutoCompleteVue,
  tags: ['autodocs'],
  title: 'components/Input',
};

const Template = args => ({
  components: { AutoCompleteVue, Button },
  data: () => ({ args }),
  template: `<div class="w-[320px] mx-auto">
    <AutoCompleteVue v-bind="args">
      <template #custom>
        <div>
          <Button variant="text" before-icon="Add" text="دکمه" />
        </div>
      </template>
    </AutoCompleteVue>
  </div>`,
});
const WithoutSlotTemplate = args => ({
  components: { AutoCompleteVue, Button },
  data: () => ({ args }),
  template: `<div class="w-[320px] mx-auto">
    <AutoCompleteVue v-bind="args"/>
  </div>`,
});

export const AutoCompleteWithSlot = Template.bind({});
export const AutoComplete = WithoutSlotTemplate.bind({});

AutoCompleteWithSlot.args = {
  data: [
    {
      icon: 'AlarmTime',
      id: 1,
    },
    {
      description: 'لورم ایپسوم متن ساختگی با تولید ',
      id: 2,
      logo: 'BankMarkazi',
      title: 'عنوان 2',
    },
    {
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی ',
      icon: 'BillScan',
      id: 3,
    },
    {
      id: 4,
      logo: 'Pasargad',
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
  placeholder: 'لیبل',
  searchPlaceholder: 'لیبل',
};

AutoComplete.args = {
  ...AutoCompleteWithSlot.args,
};
