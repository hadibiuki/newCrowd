<template>
  <div class="flex flex-col gap-md">
    <div class="terminal-contract-section text-right">
      <p class="text-text-soft text-body-400-b2">
        {{ $t('_terminal.add.contract.date', { date: contractDate }) }}
      </p>
      <ContractTemplateText
        v-if="contractTemplate && !contractTemplateLoading"
        :contract-template-route="contractTemplate?.content_url"
      />
    </div>
  </div>
  <div class="flex flex-col gap-sm bg-white-100 sticky bottom-0 pb-md">
    <ui-Button
      :text="$t('_terminal.add.contract.action_button')"
      size="large"
      :disabled="isLoading"
      :loading="isLoading"
      @click.stop="sendOTP"
    />
    <ui-Button
      :text="$t('_common.buttons.return')"
      type="tertiary"
      size="large"
      @click="$emit('preview')"
    />
  </div>
  <ContractVerifyContractModal
    v-if="showVerify"
    :is-loading-verify="isLoadingVerify"
    :mobile="user?.cell_number"
    :domain="domain"
    :flag="flag"
    :contract-template-id="contractTemplate?.id"
    :remaining="expirationTime"
    :reset-timer="resetTimer"
    :is-new-terminal="true"
    @close="() => (showVerify = false)"
    @verified="(otpCode: string) => $emit('next', otpCode)"
  />
</template>
<script lang="ts" setup>
import moment from 'moment-jalaali';
import { ContractTypeEnum, TerminalFlagEnum } from '~/graphql/graphql';
interface Props {
  domain: string;
  flag: TerminalFlagEnum;
  isLoadingVerify: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { domain, flag, isLoadingVerify } = toRefs(props);
defineEmits(['next', 'preview', 'update:modelValue']);
const { data: contractTemplate, loading: contractTemplateLoading } = useContractTemplatesQuery(
  ContractTypeEnum.Terminal
);
const { data: user, loading: userLoading } = useUserIdQuery();
const { senOtp } = useTerminalContractMutation();
const { mutate: senOtpMutate, loading: isSendOtpLoading, onDone: sendOtpOnDone } = senOtp();
const showVerify = ref(false);
const contractDate = ref<string>(moment().format('jYYYY/jMM/jDD'));
const isLoading = computed(() => userLoading.value || isSendOtpLoading.value);
const expirationTime = ref(0);
const resetTimer = ref(false);
const sendOTP = () => {
  senOtpMutate({
    contract_template_id: contractTemplate.value?.id,
    entity: flag.value === TerminalFlagEnum.Normal ? domain.value : `zarinp.al/${domain.value}`,
  });
};
sendOtpOnDone(res => {
  showVerify.value = true;
  expirationTime.value = useGetExpireCountDown(res?.data?.SendOtpContractConfirm?.expiration_time);
  resetTimer.value = true;
});
</script>
<style lang="scss" scoped>
.terminal-contract-section {
  @apply max-h-[420px] p-md rounded-md overflow-x-auto border border-border-divider bg-surface-soft;
}
</style>
