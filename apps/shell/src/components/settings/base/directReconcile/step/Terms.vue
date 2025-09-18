<template>
  <div class="flex flex-col gap-xl">
    <ui-InlineMessage
      v-if="hasWage"
      type="warning"
      :title="t('_direct_reconcile.terminal_setting.activation_modal.wage_payout_alert_title')"
      :description="
        t('_direct_reconcile.terminal_setting.activation_modal.wage_payout_alert_caption')
      "
    >
    </ui-InlineMessage>

    <SettingsBaseDirectReconcileBankAccount
      :bank-account="bankAccount"
      :preferred-bank-account-id="activeTerminal?.preferred_bank_account_id"
      :helper="bankAccountHelper"
      :loading="loading"
      :disabled="loading"
      @click="() => navigateTo(bankAccountLink)"
    />
    <div class="bg-surface-soft border border-border-divider rounded-sm p-md flex flex-col gap-md">
      <p class="text-text text-heading-600-h3">
        {{ $t('_direct_reconcile.terminal_setting.activation_modal.rules.title') }}
      </p>
      <ul class="text-body-400-b3 text-text flex flex-col gap-xs list-disc ps-md">
        <li>{{ $t('_direct_reconcile.terminal_setting.activation_modal.rules.rule1') }}</li>
        <li>{{ $t('_direct_reconcile.terminal_setting.activation_modal.rules.rule2') }}</li>
        <li>{{ $t('_direct_reconcile.terminal_setting.activation_modal.rules.rule6') }}</li>
        <i18n-t keypath="_direct_reconcile.terminal_setting.activation_modal.rules.rule3" tag="li">
          <template #bank_list>
            <span class="text-body-500-b3">
              {{ $t('_direct_reconcile.terminal_setting.activation_modal.bank_list') }}
            </span>
          </template>
        </i18n-t>
      </ul>
      <div class="flex items-center flex-wrap gap-sm pr-md">
        <div
          v-for="(slug, index) in bankList"
          :key="index"
          class="min-h-xl min-w-xl max-h-xl inline-flex justify-center items-center border relative border-border-soft rounded-sm bg-surface-soft"
        >
          <ui-BankLogo :name="slug" class="w-md h-md" />
        </div>
      </div>
      <ul class="text-body-400-b3 text-text flex flex-col gap-xs list-disc ps-md">
        <li>{{ $t('_direct_reconcile.terminal_setting.activation_modal.rules.rule4') }}</li>
        <li>{{ $t('_direct_reconcile.terminal_setting.activation_modal.rules.rule5') }}</li>
      </ul>
    </div>

    <ui-Divider />
    <div ref="checkboxRef">
      <ui-Checkbox
        :checked="checked"
        :disabled="loading || hasWage || !isValidBank"
        name="accept_rules"
        :label="$t('_direct_reconcile.terminal_setting.activation_modal.terms_confirmation')"
        :helper="{
          type: !!errors?.accept_rules ? 'error' : undefined,
          message: errors?.accept_rules,
        }"
        @change="onChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { TerminalType, Maybe, BankAccount } from '~/graphql/graphql';
import { bankList } from '@/consts/directReconcile';

interface Props {
  checked: boolean;
  hasWage: boolean;
  isValidBank: boolean;
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['update:checked']);
const { loading, isValidBank } = toRefs(props);
const t = useI18n();
const checkboxRef = ref<HTMLElement | null>(null);
const bankAccountLink = computed(
  () =>
    `/panel/${encodeURIComponent(activeTerminal?.value?.domain as string)}/settings?menu=Account`
);
const bankAccountHelper = computed(() => {
  if (loading.value) {
    return undefined;
  }
  if (!activeTerminal?.value?.preferred_bank_account_id) {
    return {
      type: 'error',
      message: t('_direct_reconcile.terminal_setting.activation_modal.empty_bank_notice'),
    };
  }
  if (!isValidBank.value) {
    return {
      type: 'error',
      message: t('_direct_reconcile.terminal_setting.activation_modal.invalid_bank_notice'),
    };
  }

  return undefined;
});
const onChange = (event: Event) =>
  emit('update:checked', (event.target as HTMLInputElement).checked);
const activeTerminal = inject<ComputedRef<Maybe<TerminalType> | undefined>>('activeTerminal');
const bankAccount = inject<ComputedRef<Maybe<BankAccount> | undefined>>('bankAccount');
const errors:
  | globalThis.ComputedRef<Partial<Record<'accept_rules', string | undefined>>>
  | undefined = inject('terms_errors');
defineExpose({
  checkboxRef,
});
</script>
