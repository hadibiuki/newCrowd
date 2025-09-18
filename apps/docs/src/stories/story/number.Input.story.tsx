import NumberInput from 'ui/numberInput/NumberInput.vue';

export default {
  argTypes: {},
  component: NumberInput,
  tags: ['autodocs'],
  title: 'components/Input',
};

export const NumberField = {
  args: {
    disabled: false,
    name: 'entity',
    placeholder: 'تعداد',
  },
};

export const NumberWithStepper = {
  args: {
    disabled: false,
    name: 'entity',
    placeholder: 'تعداد',
    stepper: true,
  },
};

export const NumberWithMin = {
  args: {
    disabled: false,
    min: 10,
    modelValue: 20,
    name: 'entity',
    placeholder: 'تعداد',
    stepper: true,
  },
};

export const NumberWithMax = {
  args: {
    disabled: false,
    max: 10,
    modelValue: 9,
    name: 'entity',
    placeholder: 'تعداد',
    stepper: true,
  },
};

export const NumberWithMaxAndMin = {
  args: {
    disabled: false,
    max: 10,
    min: 5,
    modelValue: 9,
    name: 'entity',
    placeholder: 'تعداد',
    stepper: true,
  },
};

export const NumberInputLimiterAndHelper = {
  args: {
    helper: {
      message: 'متن صحیح',
      type: 'info',
    },
    loading: false,
    maxLength: 20,
    name: 'email',
    placeholder: 'مقدار اینپوت',
  },
};
