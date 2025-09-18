<template>
  <div>
    <div class="flex flex-col items-center pt-md pb-lg gap-xl">
      <ui-Illustration :name="illustration" />
      <slot v-if="!!slots['description']" name="description"></slot>
      <span v-else-if="description" class="text-body-400-b2 text-text-soft break-words">{{
        description
      }}</span>

      <ui-OtpField
        v-model="otp"
        :loading="loading"
        :helper="hander"
        name="otp"
        class="w-full !justify-between"
        @update:model-value="verifyOtp"
      />
      <div class="flex justify-center gap-sm">
        <template v-if="showEdit && !loading">
          <ui-Button
            type="tertiary"
            size="medium"
            variant="text"
            :text="$t('session.export.edit_email')"
            @click="emit('edit')"
          />
          <ui-Divider type="vertical" />
        </template>
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
  hander?: { type: 'error' | 'success' | 'info'; message: string };
  resetTimer: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  emailVal: '',
  description: '',
  type: 'email',
  showEdit: true,
  loading: false,
  remaining: 600,
  hander: () => ({
    message: '',
    type: 'info',
  }),
  resetTimer: false,
});
const { type, remaining } = toRefs(props);
const slots = useSlots();
const emit = defineEmits(['handleStep', 'resend', 'verify', 'edit']);
const otp = ref();
const verifyOtp = () => {
  emit('verify', otp.value);
};
const resendOtp = () => {
  reset();
  emit('resend');
};
const { start, timer, formattedTime, reset } = useCountDown('otp', remaining.value, () => {
  // emit('handleStep', ExportModalEnum.VerifyEmail);
});
const illustration = computed(() => (type.value === 'email' ? 'ProductPaymentLink' : 'Otp'));
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
// const errors: ErrorsType | undefined = inject('errors');
</script>
