<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-xl h-full" dir="rtl">
      <div class="flex gap-md items-center justify-start w-full">
        <span class="flex text-heading-600-h2 text-text">
          {{ $t('_common.page_title.direct_reconcile') }}
        </span>
        <ui-Status
          v-if="isActiveDirectReconcile"
          :text="$t('_direct_reconcile.status.Accepted')"
          type="positive"
        />
      </div>
      <ui-Skeleton :loading="terminalLoading" :height="104" full-width class="w-full" radius="sm">
        <ui-InlineMessage
          v-if="rejectionReason && !isActiveDirectReconcile && isRejected"
          type="negative"
          :title="t('_direct_reconcile.inline_message.RejectedOperator.title')"
        >
          <template #description>
            <i18n-t :keypath="getRejectionError(rejectionReason).key" tag="p" class="mt-xs">
              <template #iban>
                <span class="font-Mono">{{
                  getRejectionError(rejectionReason)?.params?.iban
                }}</span>
              </template>
              <template #link>
                <NuxtLink to="/panel/ticket" class="text-primary">
                  {{ t('_helper._account.ticket') }}
                </NuxtLink>
              </template>
            </i18n-t>
          </template>
        </ui-InlineMessage>
        <ui-InlineMessage
          v-else-if="activeTerminal?.candidate_direct_reconcile_status || isActiveDirectReconcile"
          :type="inlineMessageHandler(activeTerminal?.candidate_direct_reconcile_status!).type"
          :title="inlineMessageHandler(activeTerminal?.candidate_direct_reconcile_status!).title"
          :description="
            inlineMessageHandler(activeTerminal?.candidate_direct_reconcile_status!).description
          "
          :toggle="isActiveDirectReconcile"
          :icon="inlineMessageHandler(activeTerminal?.candidate_direct_reconcile_status!).icon"
        />
      </ui-Skeleton>

      <div
        class="relative border border-border p-2xs rounded-xl flex items-center justify-center w-[72px] h-[72px]"
        :class="activeTerminal?.have_logo ? ' border-solid' : ' border-dashed'"
      >
        <SharedTerminalLogo
          :logo="activeTerminal?.have_logo ? activeTerminal?.logo : undefined"
          rounded="rounded-lg"
          size="large"
        />

        <SharedDirectReconcile class="absolute -left-xs -bottom-xs" size="lg" />
      </div>
      <div class="text-center flex flex-col gap-sm max-w-[480px]">
        <p class="text-heading-600-h3 text-text">
          {{ $t('_direct_reconcile.terminal_setting.title') }}
        </p>
        <p class="text-body-400-b3 text-text-soft">
          {{ $t('_direct_reconcile.terminal_setting.caption') }}
        </p>
      </div>
      <div
        class="p-md border border-border-divider rounded-md flex-col gap-md w-full flex justify-start"
      >
        <div class="flex items-center gap-xs">
          <ui-Icon name="CheckMarkCircleOutlined" class="text-icon-success" />
          <p class="text-body-400-b3 text-text">
            {{ t('_direct_reconcile.terminal_setting.benefits.instant_access') }}
          </p>
        </div>
        <div class="flex items-center gap-xs">
          <ui-Icon name="CheckMarkCircleOutlined" class="text-icon-success" />
          <p class="text-body-400-b3 text-text">
            {{ t('_direct_reconcile.terminal_setting.benefits.lower_liquidity_risk') }}
          </p>
        </div>
        <div class="flex items-center gap-xs">
          <ui-Icon name="CheckMarkCircleOutlined" class="text-icon-success" />
          <p class="text-body-400-b3 text-text">
            {{ t('_direct_reconcile.terminal_setting.benefits.same_day_payout') }}
          </p>
        </div>
      </div>
      <p class="text-text-soft text-body-400-b3 w-full flex justify-start">
        {{ $t('_direct_reconcile.terminal_setting.terms_acknowledgment') }}
      </p>
      <ui-Button
        :text="$t('_common.buttons.activation_request')"
        :disabled="disableRequestButton"
        :loading="terminalLoading"
        class="w-fit mr-auto"
        @click="openModal"
      />
    </div>
    <SettingsBaseDirectReconcileActivationRequestModal
      v-if="showDirectReconcileModal"
      :active-terminal="activeTerminal"
      @close="closeModal"
      @finished="onFinished"
    />
  </div>
</template>
<script lang="ts" setup>
import { Steps } from '~/consts/directReconcile';
import {
  PaymentTerminalStatusEnum,
  TerminalCandidateDirectReconcileStatusEnum,
  ZarinGateTypeEnum,
} from '~/graphql/graphql';

const { activeTerminal, loading: terminalLoading, refetch } = useTerminalQuery();
const t = useI18n();
const { inlineMessageHandler, isActiveDirectReconcile } = useDirectReconcile();
const { getRejectionError } = useShaparakError();
const showDirectReconcileModal = ref(false);
const disableRequestButton = computed(
  () => terminalLoading.value || activeTerminal.value?.candidate_direct_reconcile_status
);
const openModal = () => (showDirectReconcileModal.value = true);
const onFinished = () => {
  refetch();
  closeModal();
};
const closeModal = (step?: Steps) => {
  if (step === Steps.Final) {
    onFinished();
  }

  showDirectReconcileModal.value = false;
};
const isRejected = computed(
  () =>
    activeTerminal.value?.candidate_direct_reconcile_status ===
    TerminalCandidateDirectReconcileStatusEnum.RejectedOperator
);
const rejectionReason = computed(() => {
  const items = activeTerminal.value?.zarin_gate ?? [];

  if (!items.length) {
    return null;
  }
  const rejectionStatuses = [
    PaymentTerminalStatusEnum.InProgressShaparakError,
    PaymentTerminalStatusEnum.Reject,
  ];
  for (const item of items) {
    if (item?.type === ZarinGateTypeEnum.ShaparakDirect) {
      if (item.raw_error && rejectionStatuses.includes(item.status!)) {
        return item.raw_error;
      }

      if (
        item.shaparak_iban_error &&
        item.shaparak_iban_status !== PaymentTerminalStatusEnum.Active
      ) {
        return item.shaparak_iban_error;
      }
    }
  }

  return null;
});
provide('activeTerminal', activeTerminal);
</script>
