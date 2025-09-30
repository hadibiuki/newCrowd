<template>
  <ui-Modal
    v-if="showTemplateModal"
    text="تایید قرار‌داد"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[500px]"
    @close="$emit('close')"
  >
    <template #body>
      <ui-Illustration name="Otp" class="flex justify-cetner mx-auto mb-md" />
      <p class="text-body-400-b2 text-text-soft break-words flex justify-center">
        لطفا رمز پیامک شده به <strong class="mx-2xs text-text">شماره نماینده سجامی</strong> را وارد کنید.
      </p>
      <SharedExportVerifyOtp
        :loading="loading"
        type="mobile"
        :remaining="10"
        :reset-timer="true"
        :show-edit="false"
        @resend="emit('resend')"
        @verify="verifyOTP"
      >
      </SharedExportVerifyOtp>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
defineProps<{
  showTemplateModal: boolean;
  loading: boolean;
}>();
const emit = defineEmits(['resend', 'verified', 'close']);
const verifyOTP = (code: string) => {
  emit('verified', code);
};
</script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
  }
}
.rtl {
  direction: rtl;
}

// .main__item--heading {
//   flex: 1 0 2%;
// }
</style>
