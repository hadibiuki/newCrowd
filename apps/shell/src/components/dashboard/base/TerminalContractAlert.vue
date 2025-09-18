<template>
  <ui-Skeleton
    v-for="contract in activeTerminalContract"
    :key="contract?.id"
    :loading="loading"
    full-width
    :height="148"
    class="my-md"
  >
    <ui-InlineMessage
      v-if="contract?.status === ContractStatusEnum.Pending"
      type="warning"
      :title="contract?.template?.title"
      :description="t('_terminal.contract_alert.description')"
      :action-button-text="t('_terminal.contract_alert.action_button')"
      @action-button-handler="() => openContractModal(contract?.template?.id || '')"
    />
  </ui-Skeleton>
</template>

<script setup lang="ts">
import { ContractStatusEnum } from '~/graphql/graphql';

defineProps<{
  loading: boolean;
}>();
const router = useRouter();
const { activeTerminalContract, activeTerminal } = useTerminalQuery();
const t = useI18n();
const openContractModal = (contractId: string) => {
  router.push(
    `/panel/${encodeURIComponent(
      activeTerminal.value?.domain as string
    )}/settings?contractId=${contractId}`
  );
};
</script>
