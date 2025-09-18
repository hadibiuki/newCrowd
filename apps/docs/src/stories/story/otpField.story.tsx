import OtpField from 'ui/otpField/OtpField.vue';

export default {
  argTypes: {},
  component: OtpField,
  tags: ['autodocs'],
  title: 'components/otpField',
};

export const Default = {
  args: {
    codeLength: 6,
    modelValue: '123456',
    name: 'otp',
  },
};

export const WithErrorHelper = {
  args: {
    codeLength: 6,
    helper: {
      message: '.کد وارد شده صحیح نیست، مجددا بررسی نمایید',
      type: 'error',
    },
    modelValue: '',
    name: 'otp',
  },
};

export const WithSuccessHelper = {
  args: {
    codeLength: 6,
    helper: {
      message: '.کد وارد شده صحیح است',
      type: 'success',
    },
    modelValue: '',
    name: 'otp',
  },
};

export const WithInfoHelper = {
  args: {
    codeLength: 6,
    helper: {
      message: '.کد وارد شده هنوز دریافت نشده',
      type: 'info',
    },
    modelValue: '',
    name: 'otp',
  },
};
