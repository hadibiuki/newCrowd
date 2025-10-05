<template>
  <div class="max-w-[400px] flex flex-col mx-auto">
    <TerminalStepHeader v-if="step === StepEnum.LEGUAL_ID" class="mb-3xl">
      <template #icon>
        <ui-Icon name="CheckMarkCircleFill" class="text-text-success !text-[48px]" />
      </template>
    </TerminalStepHeader>
    <TerminalStepName
      v-if="step === StepEnum.LEGUAL_ID"
      @next="nameStepHandler"
      @preview="$router.push('/')"
    />
    <TerminalStepRull
      v-if="step === StepEnum.RULL"
      :loading="loading"
      @preview="step = StepEnum.RULL"
      @next="callOtpHandler"
    />
    <TerminalStepAccept v-if="step === StepEnum.ACCEPT_LEGUAL" />
    <TerminalStepModal
      :show-template-modal="showTemplateModal"
      :loading="loading"
      @close="showTemplateModal = false"
      @next="addCompanyByNameHandler"
    />
    <TerminalStepOtp
      :show-template-modal="showTemplateOtp"
      :loading="loading"
      @close="showTemplateOtp = false"
      @verified="checkOtpHandler"
      @resend="callOtpHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { sendFinancialInstitutionApi, VerifyFinancialInstitutionApi } from '~/restApi/legals';
import { UpdateUserDataApi } from '~/restApi/profile';
const router = useRouter();
const { $notify } = useNuxtApp();
const showTemplateModal = ref(false);
const showTemplateOtp = ref(false);
const loading = ref(false);
enum StepEnum {
  LEGUAL_ID = 'legual_id',
  RULL = 'rull',
  ACCEPT_LEGUAL = 'accept_legual',
}
const step = ref(StepEnum.ACCEPT_LEGUAL);
const ssn = ref('');
const nameStepHandler = (data: string) => {
  ssn.value = data;
  step.value = StepEnum.RULL;
};
const callOtpHandler = () => {
  const body = {
    nationalId: ssn.value,
  };
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  sendFinancialInstitutionApi(body)
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res.data && res.data.nextStep === 'manualRegister') {
        showTemplateModal.value = true;
      } else {
        showTemplateOtp.value = true;
      }
    })

    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
const addCompanyByNameHandler = (name: string) => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  UpdateUserDataApi({
    companyName: name,
    nationalId: ssn.value,
  })
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res) {
        $notify({
          isRead: false,
          message: 'شرکت با موفقیت ثبت شد',
          type: 'success',
        });
        router.push('/');
      }
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
const checkOtpHandler = (code: string) => {
  const body = {
    nationalId: ssn.value,
    otp: code,
  };
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  VerifyFinancialInstitutionApi(body)
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res) {
        step.value = StepEnum.ACCEPT_LEGUAL;
        showTemplateOtp.value = false;
      }
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<style scoped lang="scss">
:deep(.domain .input__inner__unit),
:deep(.domain .input__inner input) {
  direction: ltr;
}
</style>
