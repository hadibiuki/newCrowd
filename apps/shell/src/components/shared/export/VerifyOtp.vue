<template>
  <div>
    <div class="flex flex-col items-center pt-md pb-lg gap-xl">
      <slot v-if="!!slots['description']" name="description"></slot>
      <span v-else-if="description" class="text-body-400-b2 text-text-soft break-words">{{
        description
      }}</span>
      <ui-OtpField
        v-model="otp"
        :loading="loading"
        :helper="handler"
        :code-length="codeLength"
        name="otp"
        class="w-full !justify-between"
        @update:model-value="verifyOtp"
        @update="emit('changeotp')"
      />
      <div class="flex justify-center gap-sm">
        <ui-Button
          v-if="timer === 0 || loading"
          type="tertiary"
          size="medium"
          variant="text"
          :text="$t('_common.actions.resend_otp')"
          :loading="loading"
          @click="resendOtp"
        />
        <span v-else class="text-body-400-b3 text-text-soft flex items-center gap-2xs text-center">
          <span class="w-xl">{{ formattedTime }}</span>
          {{ $t('notif_settings.resend_otp_timer') }}
        </span>
        <template v-if="showEdit && !loading">
          <ui-Divider type="vertical" />
          <ui-Button type="tertiary" variant="text" :text="editTitle" @click="emit('edit')" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  emailVal?: string;
  type: 'email' | 'mobile';
  description?: string;
  showEdit?: boolean;
  loading: boolean;
  remaining?: number;
  handler?: { type: 'error' | 'success' | 'info'; message: string };
  resetTimer: boolean;
  editTitle: string;
  codeLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  emailVal: '',
  description: '',
  editTitle: '',
  type: 'email',
  showEdit: true,
  loading: false,
  remaining: 120,
  codeLength: 6,
  handler: () => ({
    message: '',
    type: 'info',
  }),
  resetTimer: true,
});
const { remaining } = toRefs(props);
const slots = useSlots();
const emit = defineEmits(['handleStep', 'resend', 'verify', 'edit', 'changeotp']);
const otp = ref();
const verifyOtp = () => {
  emit('verify', otp.value);
};
const resendOtp = () => {
  reset();
  emit('resend');
};
const { start, timer, formattedTime, reset } = useCountDown('otp', remaining.value, () => {
  console.log({ remaining: remaining.value });
  // emit('handleStep', ExportModalEnum.VerifyEmail);
});
watch(
  () => props.resetTimer,
  newValue => {
    if (newValue) {
      start();
    }
  },
  { immediate: true }
);

export type ErrorsType = globalThis.ComputedRef<Partial<Record<'otp', string | undefined>>>;
</script>
