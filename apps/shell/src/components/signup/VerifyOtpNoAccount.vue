<template>
  <SharedExportVerifyOtp
    :loading="isLoading"
    type="mobile"
    :remaining="remaining"
    :handler="handler"
    :reset-timer="resetTimer"
    :edit-title="$t('otp.edit_number')"
    @resend="emit('resendOtp')"
    @verify="verifyOTP"
    @edit="emit('edit')"
  >
  </SharedExportVerifyOtp>
</template>
<script lang="ts" setup>
interface Props {
  mobile: string;
  remaining: number;
  domain: string;
  resetTimer: boolean;
  isLoadingVerify?: boolean;
  loading: boolean;
  handler?: { type: 'error' | 'success' | 'info'; message: string };
}
const props = withDefaults(defineProps<Props>(), {
  resetTimer: true,
  loading: false,
  handler: () => ({
    message: '',
    type: 'info',
  }),
});
const { remaining, isLoadingVerify, loading } = toRefs(props);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['verified', 'edit', 'resendOtp', 'changeotp', 'submit']);
// const t = useI18n();
// const { $notify } = useNuxtApp();
const isLoading = computed(() => loading.value || isLoadingVerify.value);
const verifyOTP = (code: string) => {
  emit('verified', code);
};
</script>
