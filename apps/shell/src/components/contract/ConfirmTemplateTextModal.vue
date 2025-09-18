<template>
  <ui-Modal
    v-if="showTemplateModal"
    :text="t('_terminal.add.contract.title')"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[500px]"
    @close="$emit('close')"
  >
    <template #body>
      <ui-InlineMessage
        v-if="isUnsigned"
        type="warning"
        :title="contract.template?.title"
        :description="t('_terminal.contract_alert.description_verify')"
      />
      <p class="text-text-soft text-body-500-b3 mt-md">
        {{ t('_terminal.contract_alert.version', { version: contract.template?.version }) }}
      </p>
      <ContractTemplateText :contract-template-route="contract.template?.content_url" />
    </template>
    <template #footer>
      <div class="flex justify-end gap-xs w-full">
        <ui-Button
          v-if="isUnsigned"
          class="w-full"
          type="primary"
          :text="t('_terminal.add.contract.action_button')"
          :loading="isSendOtpLoading"
          @click="onSendOtp"
        />
        <ui-Button
          v-else
          type="secondary"
          :text="t('_common.buttons.close')"
          @click="$emit('close')"
        />
      </div>
    </template>
  </ui-Modal>

  <ContractVerifyContractModal
    v-if="showVerify"
    :mobile="user?.cell_number"
    :domain="activeTerminal?.domain"
    :contract-template-id="contract.template?.id"
    :remaining="expirationTime"
    :reset-timer="resetTimer"
    @close="() => (showVerify = false)"
    @verified="onVerified"
  />
</template>
<script lang="ts" setup>
import { ContractStatusEnum, ContractType } from '~/graphql/graphql';

const { activeTerminal } = useTerminalQuery();
const { senOtp } = useTerminalContractMutation();
const { mutate: senOtpMutate, loading: isSendOtpLoading, onDone: sendOtpOnDone } = senOtp();
const { data: user } = useUserIdQuery();
const showVerify = ref(false);
const expirationTime = ref(0);
const resetTimer = ref(false);
const props = defineProps<{
  contract: ContractType;
  showTemplateModal: boolean;
}>();
const { contract } = toRefs(props);
const isUnsigned = computed(() => contract.value?.status !== ContractStatusEnum.Signed);
const emit = defineEmits(['close']);
const t = useI18n();
const onSendOtp = () => {
  senOtpMutate({
    contract_template_id: contract.value.template?.id,
    entity: activeTerminal?.value?.domain,
  });
};
sendOtpOnDone(res => {
  expirationTime.value = useGetExpireCountDown(res?.data?.SendOtpContractConfirm?.expiration_time);
  emit('close');
  showVerify.value = true;
  resetTimer.value = true;
});
const onVerified = () => {
  showVerify.value = false;
};
</script>
