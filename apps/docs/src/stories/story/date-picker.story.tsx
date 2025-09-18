import DatePicker from '@date/components/DatePicker.vue';
import { action } from '@storybook/addon-actions';

function exposeDate(v) {
  console.log(v);
}

export default {
  argTypes: {},
  component: DatePicker,
  tags: ['autodocs'],
  title: 'components/DatePicker',
};
const Template = args => ({
  components: { DatePicker },
  methods: { action },

  setup() {
    return { args, exposeDate };
  },
  template: `
    <div dir="rtl" class="w-[18.5rem]">
      <DatePicker v-bind="args" @expose="exposeDate" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const InitialDate = Template.bind({});
InitialDate.args = {
  initialDate: '1402-07-12',
};

export const InitialDateRange = Template.bind({});
InitialDateRange.args = {
  initialDate: ['1402-08-01', '1402-08-18'],
  range: true,
};

export const OnlyDaysOfCurrent = Template.bind({});
OnlyDaysOfCurrent.args = {
  onlyCurrentMonthDays: true,
};

export const WeekendDays = Template.bind({});
WeekendDays.args = {
  weekend: [6, 7],
};

export const CustomFormatExpose = Template.bind({});
CustomFormatExpose.args = {
  exposeFormat: 'YYYY/MM/DD HH:mm',
};

export const CustomHolidays = Template.bind({});
CustomHolidays.args = {
  holidays: [/1402\/7\/1(.*)/, ['1402-07-09', '1402-07-20'], ['1399-10', '1400-02']],
};
export const WithDisabled = Template.bind({});
WithDisabled.args = {
  inValidDates: [/1402\/7\/1(.*)/, ['1402-07-09', '1402-07-20'], ['1399-10', '1400-02']],
};
export const WithSteps = Template.bind({});
WithSteps.args = {
  steps: ['year', 'month', 'day'],
};
export const OnlyDaySelect = Template.bind({});
OnlyDaySelect.args = {
  onlyDay: true,
};
export const OnlyMonthSelect = Template.bind({});
OnlyMonthSelect.args = {
  onlyMonth: true,
};

export const OnlyYearSelect = Template.bind({});
OnlyYearSelect.args = {
  onlyYear: true,
};
