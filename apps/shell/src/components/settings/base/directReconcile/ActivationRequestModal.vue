<template>
  <ui-Modal
    close-icon
    :text="$t('_direct_reconcile.terminal_setting.activation_modal.title')"
    class="max-w-[580px]"
    main-class="select-product"
    @close="$emit('close', step)"
  >
    <template #body>
      <SettingsBaseDirectReconcileStepTerms
        v-if="step === Steps.Terms"
        ref="scrollRef"
        v-model:checked="acceptRules"
        :has-wage="hasWage"
        :is-valid-bank="isValidBank"
        :loading="loading || bankAccountLoading"
        @checked="onCheckedRules"
      />

      <SettingsBaseDirectReconcileStepSubmit
        v-if="step === Steps.Submit"
        :disabled-services="disabledServices"
      />
      <SettingsBaseDirectReconcileStepFinal v-if="step === Steps.Final" />
    </template>
    <template #footer>
      <div class="flex justify-end gap-xs w-full">
        <ui-Button
          v-if="step !== Steps.Final"
          :text="$t('_common.buttons.cancel')"
          :disabled="loading"
          type="secondary"
          @click="$emit('close')"
        />

        <ui-Button
          v-if="step === Steps.Terms"
          :text="$t('_common.buttons.confirm_and_continue')"
          :loading="loading || userLoading || notificationLoading"
          :disabled="!canRequest"
          @click="submit"
        />
        <ui-Button
          v-if="step === Steps.Submit"
          :loading="candidateLoading"
          :disabled="candidateLoading"
          :text="$t('_common.buttons.confirm_and_submit_request')"
          @click="submitDirectReconcileRequest"
        />
        <ui-Button
          v-if="step === Steps.Final"
          type="light"
          :text="$t('_common.buttons.ok')"
          @click="$emit('finished')"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import type Terms from '../directReconcile/step/Terms.vue';
import {
  NotificationPreferenceChannelEnum,
  ReconcileWageTypeEnum,
  TerminalPermissionEnum,
  TerminalType,
} from '~/graphql/graphql';
import { bankList, Steps } from '@/consts/directReconcile';

defineEmits(['close', 'submit', 'finished']);
const t = useI18n();
interface Props {
  loading?: boolean;
  activeTerminal: TerminalType;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
const { data: userData, loading: userLoading } = useUserIdQuery();
const { data, loading: notificationLoading, refetch } = useNotificationQuery();
const { activeTerminal, loading } = toRefs(props);
const { useBankAccountsByIdLazy } = useBankQuery();
const {
  data: bankAccount,
  refetch: refetchBankAccountById,
  load,
  loading: bankAccountLoading,
} = useBankAccountsByIdLazy(activeTerminal.value?.preferred_bank_account_id);
const { mutationCandidateDirectReconcile } = useDirectReconcileMutation();
const { mutate, onDone, loading: candidateLoading } = mutationCandidateDirectReconcile();
const step = ref(Steps.Terms);
const acceptRules = ref(false);
const scrollRef = ref<InstanceType<typeof Terms> | null>(null);
const errors = ref<Record<string, string | undefined>>({});
onMounted(() => {
  refetchBankAccountById({
    id: activeTerminal.value?.preferred_bank_account_id,
  }) || load(BankAccountsSchema, { id: activeTerminal.value?.preferred_bank_account_id });
  refetch();
});
const hasWage = computed(
  () =>
    activeTerminal.value?.reconcile_wage_type === ReconcileWageTypeEnum.Fix ||
    activeTerminal.value?.reconcile_wage_type === ReconcileWageTypeEnum.Float
);
const isValidBank = computed(() => {
  if (!bankAccount.value?.issuing_bank?.slug) {
    return false;
  }

  return bankList.includes(bankAccount.value?.issuing_bank?.slug);
});
const canRequest = computed(() => isValidBank.value && !loading.value && !hasWage.value);
const isActiveSms = computed(
  () =>
    data.value?.notification_preferences?.some(
      pref => pref?.channels?.includes(NotificationPreferenceChannelEnum.Sms)
    ) ?? false
);
const isOwner = computed(
  () =>
    activeTerminal?.value?.owner_id &&
    userData.value?.id &&
    userData.value?.id === activeTerminal.value?.owner_id
);
const disabledServices = computed(() => {
  const services = [{ title: 'refound', icon: 'Refund' }];
  const { hasPermission: hasInstantPayoutAccess } = usePermissionValidate(
    TerminalPermissionEnum.InstantPayout
  );
  const { hasPermission: hasPayoutAccess } = usePermissionValidate(TerminalPermissionEnum.Payout);
  const { hasPermission: hasWagePayoutAccess } = usePermissionValidate(
    TerminalPermissionEnum.WagePayout
  );
  const { hasPermission: hasEditSessionAccess } = usePermissionValidate(
    TerminalPermissionEnum.SessionEdit
  );

  if (hasInstantPayoutAccess.value) {
    services.push({ title: 'instant_payout', icon: 'InstantPayout' });
  }
  if (hasPayoutAccess.value || hasWagePayoutAccess.value) {
    services.push({ title: 'wage_payouts', icon: 'Payout' });
  }
  if (isOwner.value || hasEditSessionAccess.value) {
    services.push({ title: 'ayan', icon: 'UserAyan' });
  }
  if (isActiveSms.value) {
    services.push({ title: 'sms', icon: 'ChatMessage' });
  }

  return services;
});
const submit = () => {
  if (!acceptRules.value) {
    errors.value.accept_rules = t(
      '_direct_reconcile.terminal_setting.activation_modal.review_and_accept_terms'
    );
    nextTick(() => {
      scrollRef?.value?.checkboxRef?.scrollIntoView({ behavior: 'smooth' });
    });

    return;
  }
  step.value = Steps.Submit;
};
const submitDirectReconcileRequest = () => {
  mutate({
    id: activeTerminal.value?.id,
  });
};
const onCheckedRules = (event: Event) => {
  acceptRules.value = (event.target as HTMLInputElement).checked;
};
onDone(() => {
  step.value = Steps.Final;
});
provide('terms_errors', errors);
provide('bankAccount', bankAccount);
</script>
