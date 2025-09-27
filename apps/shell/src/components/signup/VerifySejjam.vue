<template>
  <SharedExportVerifyOtp
    :loading="isLoading"
    type="mobile"
    :show-edit="true"
    :remaining="remaining"
    :handler="handler"
    :reset-timer="resetTimer"
    :edit-title="$t('signup.not_access_to_number')"
    :code-length="5"
    @resend="emit('resendOtp')"
    @verify="verifyOTP"
    @edit="emit('edit')"
    @changeotp="emit('changeotp')"
  >
  </SharedExportVerifyOtp>
</template>
<script lang="ts" setup>
interface Props {
  remaining: number;
  resetTimer: boolean;
  contractTemplateId: string;
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
