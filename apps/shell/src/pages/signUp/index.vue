<template>
  <div class="pb-3xl container-xl max-w-[300px]">
    <div class="flex flex-col w-full h-full items-center mt-3xl">
      <NuxtImg
        src="../public/img/logo-mark.svg"
        alt="zarinCrowd"
        width="48px"
        height="48px"
        class="mb-3xl"
      />
      <div class="text-heading-600-h2 mb-sm">{{ getTitle }}</div>
      <span class="flex mb-3xl text-body-400-b2 text-text-soft text-cente">{{
        getDescription
      }}</span>
      <SignupPhone
        v-if="step === Steps.PHONE"
        class="w-full max-w-[400px]"
        :loading="loading"
        @send="sendPhoneNumberHandler"
      />
      <SignupVerifyOtp
        v-if="step === Steps.OTP"
        class="w-full max-w-[400px]"
        :has-password="hasPassword"
        :remaining="120"
        :handler="handler"
        :loading="loading"
        @edit="isStepPassword = !isStepPassword"
        @resendOtp="resendOtpHandler"
        @verified="verifiedOtpHandler"
        @submit="signupWithPasswordHandler"
        @changeotp="
          handler = {
            type: 'info',
            message: '',
          }
        "
      />
      <SignupVerifyOtpNoAccount
        v-if="step === Steps.NOACCOUNT"
        class="w-full max-w-[400px]"
        :remaining="10"
        :handler="handler"
        :loading="loading"
        @edit="editPhoneHandler"
        @resendOtp="resendOtpHandler"
        @verified="verifiedOtpNoAccountHandler"
        @changeotp="
          handler = {
            type: 'info',
            message: '',
          }
        "
      />
      <SignupSsn
        v-if="step === Steps.SSN"
        class="w-full max-w-[400px]"
        :loading="loading"
        @send="sentSsnHandler"
      />
      <SignupVerifySejjam
        v-if="step === Steps.SEJAM"
        class=""
        :remaining="300"
        :handler="handler"
        :loading="loading"
        @edit="step = Steps.INFO"
        @resendOtp="getSejamOtp"
        @verified="verifyOTPHandler"
        @changeotp="
          handler = {
            type: 'info',
            message: '',
          }
        "
      />
      <SignupInfoForm
        v-if="step === Steps.INFO"
        class="w-full max-w-[400px]"
        @data="getUserNameDataHandler"
      />
      <SignupSetPassword
        v-if="step === Steps.PASS"
        class="w-full max-w-[400px]"
        @data="getAllInformationData"
      />
      <SignupModal
        :show-template-modal="showTemplateModal"
        :loading="loading"
        @close="showTemplateModal = false"
        @next="sentHoleData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  completeUserRegistrationApi,
  getOtpForSignupApi,
  getSejamOtpApi,
  loginWhitPasswordHandlerApi,
  sendNationalCodeApi,
  sendOtpForVerifiedApi,
  signUpSendPhonNumberApi,
  validateOtpApi,
  validateSejamOtpApi,
} from '~/restApi/signup';
const { $notify } = useNuxtApp();
interface Handler {
  type: 'error' | 'success' | 'info';
  message: string;
}

definePageMeta({
  name: 'signUp',
  layout: 'signup',
});
const t = useI18n();
useHead({
  title: t('_common.page_title.dashboard'),
});

enum Steps {
  PHONE,
  OTP,
  NOACCOUNT,
  SSN,
  SEJAM,
  INFO,
  PASS,
}
const step = ref(Steps.PHONE);
const loading = ref(false);
let hasAccount = false;
let hasPassword = true;
let userPhoneNumber = '';
const isStepPassword = ref(true);
let userId = '';
let accountId = '';
const showTemplateModal = ref(false);
const hasSejam = ref(false);
const userData = reactive({
  firstName: '',
  lastName: '',
  password: '',
  repeatPassword: '',
  referralCode: null,
  howToFindZarinCrowd: null,
});
const getTitle = computed(() => {
  switch (step.value) {
    case Steps.PHONE:
      return 'ورود به زرین‌کراد';
    case Steps.OTP:
      return 'ورود به زرین‌کراد';
    case Steps.NOACCOUNT:
      return 'ایجاد حساب زرین‌کراد';
    case Steps.SSN:
      return 'ایجاد حساب زرین‌کراد';
    case Steps.SEJAM:
      return 'تایید سامانه سجام';
    case Steps.INFO:
      return 'ایجاد حساب زرین‌کراد';
    case Steps.PASS:
      return 'ایجاد حساب زرین‌کراد';
    default:
      return 'ورود به زرین‌کراد';
  }
});
const getDescription = computed(() => {
  switch (step.value) {
    case Steps.PHONE:
      return 'برای استفاده از خدمات زرین‌کراد وارد شوید.';
    case Steps.OTP:
      if (isStepPassword) {
        return 'برای ورود رمز عبور خود را وارد کنید';
      }

      // eslint-disable-next-line no-irregular-whitespace
      return `رمز یکبار مصرف پیامک شده به شماره  ${userPhoneNumber}  را وارد کنید`;
    case Steps.SSN:
      return 'برای ساخت حساب کد ملی خود را وارد کنید';
    case Steps.NOACCOUNT:
      // eslint-disable-next-line no-irregular-whitespace
      return `رمز یکبار مصرف پیامک شده به شماره  ${userPhoneNumber}  را وارد کنید`;
    case Steps.SEJAM:
      return 'رمز یکبار مصرف ۶ رقمی پیامک شده به شماره ثبت شده درسامانه سجام را وارد کنید';
    case Steps.INFO:
      return 'نام و نام‌خانوادگی خود را به طور کامل وارد کنید';
    case Steps.PASS:
      return 'برای تکمیل ثبت‌نام اطلاعات زیر را وارد کنید';
    default:
      return 'ورود به زرین‌کراد';
  }
});
// ************* step PHONE
const sendPhoneNumberHandler = (phone: string) => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  signUpSendPhonNumberApi({ phoneNumber: phone })
    .then(res => {
      userPhoneNumber = phone;

      const temp = res.data;
      hasAccount = temp.hasAccount;
      hasPassword = temp.hasPassword;
      if (temp.hasPassword) {
        isStepPassword.value = true;
      } else {
        isStepPassword.value = false;
      }
      userId = temp.userId;
      accountId = temp.accountId;
      // eslint-disable-next-line promise/always-return
      if (hasAccount) {
        step.value = Steps.OTP;
      } else {
        resendOtpHandler();
        step.value = Steps.NOACCOUNT;
      }
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
// ************ step OTP
const editPhoneHandler = () => {
  hasAccount = false;
  hasPassword = false;
  userId = '';
  accountId = '';
  step.value = Steps.PHONE;
};
const senOtp = () => {
  getOtpForSignupApi({
    accountId,
    userId,
  });
};
const resendOtpHandler = () => {
  senOtp();
};
const handler: Ref<Handler> = ref({ type: 'info', message: '' });
const verifiedOtpHandler = (code: string) => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  sendOtpForVerifiedApi({
    userId,
    accountId,
    otp: code,
  })
    // eslint-disable-next-line promise/always-return
    .then(res => {
      localStorage.setItem('token', res.data.token);
      nextTick(() => {
        navigateTo({
          path: '/panel',
        });
      });
    })
    .catch(err => {
      handler.value = {
        type: 'error',
        message: err.details.meta.errorMessage,
      };
    })
    .finally(() => {
      loading.value = false;
    });
};
const signupWithPasswordHandler = (pass: string) => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  loginWhitPasswordHandlerApi({
    userId,
    accountId,
    password: pass,
  })
    // eslint-disable-next-line promise/always-return
    .then(res => {
      localStorage.setItem('token', res.data.token);
      nextTick(() => {
        navigateTo({
          path: '/panel',
        });
      });
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
// ************ step otp has no account
const verifiedOtpNoAccountHandler = (otp: string) => {
  // eslint-disable-next-line promise/catch-or-return
  validateOtpApi({
    userId,
    accountId,
    otp,
  })
    .then(res => {
      const registrationStep = res.data.authenticationStep;
      // eslint-disable-next-line promise/always-return
      switch (registrationStep) {
        case 1:
          step.value = Steps.SSN;
          break;
        case 2:
          step.value = Steps.SEJAM;
          getSejamOtp();
          break;
        case 3:
          step.value = Steps.INFO;
          break;
        case 4:
          step.value = Steps.PASS;
          break;
        default:
          step.value = Steps.SEJAM;
          getSejamOtp();
      }
    })
    .catch((err: { message: string }) => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
//
// ************ step ssn
const sentSsnHandler = (ssn: string) => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  sendNationalCodeApi({
    userId,
    accountId,
    nationalCode: ssn,
  })
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res.data.hasSejam) {
        hasSejam.value = true;
        step.value = Steps.SEJAM;
        // TODO cal otp function for sejjam
        getSejamOtp();
      } else {
        step.value = Steps.INFO;
      }
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
// ************ step sejam
const getSejamOtp = () => {
  getSejamOtpApi({
    userId,
    accountId,
  })
    // eslint-disable-next-line promise/always-return
    .then(res => {
      console.log({ res });
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    });
};
const verifyOTPHandler = (code: string) => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  validateSejamOtpApi({
    userId,
    accountId,
    otp: code,
  })
    // eslint-disable-next-line promise/always-return
    .then(() => {
      step.value = Steps.PASS;
    })
    .catch(err => {
      handler.value = {
        type: 'error',
        message: err.details.meta.errorMessage,
      };
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
// ************ step info
const getUserNameDataHandler = (data: any) => {
  userData.firstName = data.firstName;
  userData.lastName = data.lastName;
  step.value = Steps.PASS;
};
// ************ step password
const getAllInformationData = (data: object) => {
  userData.password = data.password;
  userData.repeatPassword = data.repeatPassword;
  userData.referralCode = data.referralCode || '';
  userData.howToFindZarinCrowd = data.howToFindZarinCrowd || '';
  showTemplateModal.value = true;
};
const sentHoleData = () => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  completeUserRegistrationApi(
    {
      ...userData,
      userId,
      accountId,
    },
    hasSejam.value
  )
    // eslint-disable-next-line promise/always-return
    .then(res => {
      localStorage.setItem('token', res.data.token);
      nextTick(() => {
        navigateTo({
          path: '/panel',
        });
      });
      showTemplateModal.value = true;
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
