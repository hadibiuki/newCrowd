import TextFiled from 'ui/textField/TextField.vue';

export default {
  argTypes: {},
  component: TextFiled,
  tags: ['autodocs'],
  title: 'components/Input',
};

export const Default = {
  args: {
    disabled: false,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
  },
};

export const Amount = {
  args: {
    amount: true,
    name: 'amount',
    placeholder: 'مبلغ',
  },
};

export const Error = {
  args: {
    error: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    value: 'مقدار مشخص',
  },
};
export const WithInitialValue = {
  args: {
    loading: false,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
    value: 'مقدار پیش فرض',
  },
};
export const Loading = {
  args: {
    loading: true,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
  },
};

export const WithBeforeIcon = {
  args: {
    beforeIcon: 'ArchiveIn',
    loading: false,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
  },
};

export const WithAfterIcon = {
  args: {
    afterIcon: 'ArchiveIn',
    loading: false,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
  },
};

export const WithUnit = {
  args: {
    loading: false,
    name: 'email',
    placeholder: 'نام و نام خانوادگی',
    unit: 'واحد',
  },
};

export const WithButton = {
  args: {
    button: 'دکمه',
    loading: false,
    name: 'email',
    placeholder: 'with emit button action',
  },
};

export const WithErrorHelper = {
  args: {
    error: true,
    helper: {
      message: 'متن ارور',
      type: 'error',
    },
    loading: false,
    name: 'email',
    placeholder: 'مقدار اینپوت',
  },
};

export const WithSuccessHelper = {
  args: {
    helper: {
      message: 'متن صحیح',
      type: 'success',
    },
    loading: false,
    name: 'email',
    placeholder: 'مقدار اینپوت',
  },
};

export const WithInfoHelper = {
  args: {
    helper: {
      message: 'متن صحیح',
      type: 'info',
    },
    loading: false,
    name: 'email',
    placeholder: 'مقدار اینپوت',
  },
};

export const WithLimiter = {
  args: {
    loading: false,
    maxLength: 20,
    name: 'email',
    placeholder: 'مقدار اینپوت',
  },
};

export const WithLimiterAndHelper = {
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
