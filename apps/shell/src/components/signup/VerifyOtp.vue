<template>
  <div v-if="hasPassword && step === 'password'">
    <div class="flex flex-row items-centers justify-center gap-xs mb-lg">
      <ui-Button
        class="h-[48px]"
        type="primary"
        icon="ArrowLeft"
        :loading="loading"
        @click="passwordSubmit"
      />
      <ui-TextField
        v-model="password"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.password')"
        :type="passwordType"
        class="w-full h-[48px]"
        name="discount_percent"
        max-length="11"
        :after-icon="passwordType === 'password' ? 'EyeHidden' : 'EyeShow'"
        @keyup.enter="passwordSubmit"
        @buttonAction="iconToggle"
      />
    </div>
    <ui-Button
      class="w-full text-center"
      type="tertiary"
      variant="text"
      :text="$t('signup.login_whit_otp')"
      @click="goToOtp"
    />
  </div>
  <SharedExportVerifyOtp
    v-else
    :loading="isLoading"
    type="mobile"
    :show-edit="hasPassword"
    :remaining="remaining"
    :handler="handler"
    :reset-timer="resetTimer"
    :edit-title="$t('signup.login_whit_pass')"
    @resend="emit('resendOtp')"
    @verify="verifyOTP"
    @edit="
      step = 'password';
      emit('edit');
    "
    @changeotp="emit('changeotp')"
  >
  </SharedExportVerifyOtp>
</template>
<script lang="ts" setup>
interface Props {
  mobile: string;
  remaining: number;
  domain: string;
  resetTimer: boolean;
  contractTemplateId: string;
  isNewTerminal?: boolean;
  isLoadingVerify?: boolean;
  loading: boolean;
  handler?: { type: 'error' | 'success' | 'info'; message: string };
  hasPassword: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  resetTimer: true,
  isNewTerminal: false,
  loading: false,
  hasPassword: false,
  handler: () => ({
    message: '',
    type: 'info',
  }),
});
const password = ref('');
const { remaining, isLoadingVerify, loading, hasPassword } = toRefs(props);
const step = ref(hasPassword.value ? 'password' : 'otp');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['verified', 'edit', 'resendOtp', 'changeotp', 'submit']);
// const t = useI18n();
// const { $notify } = useNuxtApp();
const isLoading = computed(() => loading.value || isLoadingVerify.value);
const verifyOTP = (code: string) => {
  emit('verified', code);
};
const passwordType = ref('password');
const iconToggle = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};
const passwordSubmit = () => {
  emit('submit', password.value);
};
const goToOtp = () => {
  passwordType.value = 'password';
  step.value = 'otp';
  emit('edit');
  emit('resendOtp');
};
</script>
