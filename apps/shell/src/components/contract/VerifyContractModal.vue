<template>
  <ui-Modal
    :text="t('_terminal.add.header.contract')"
    close-icon
    header
    width="400px"
    class="w-full lg:max-w-[400px] max-h-[500px]"
    @close="$emit('close')"
  >
    <template #body>
      <SharedExportVerifyOtp
        :loading="isLoading"
        type="mobile"
        :show-edit="false"
        :remaining="remaining"
        :hander="handler"
        :reset-timer="resetTimer"
        @resend="resendOtp"
        @verify="verifyOTP"
      >
        <template #description>
          <div class="flex flex-col">
            <i18n-t
              keypath="_terminal.add.contract.verify_mobile"
              tag="span"
              class="text-body-400-b2 text-text-soft text-center"
            >
              <template #mobile>
                <span class="text-text">
                  {{ mobile }}
                </span>
              </template>
            </i18n-t>
            <span class="text-body-400-b2 text-text-soft text-center">{{
              $t('_terminal.add.contract.verify_mobile_notice')
            }}</span>
          </div>
        </template>
      </SharedExportVerifyOtp>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { GraphQLError } from 'graphql';
import { useContractOtpSchema } from '~/composables/terminal/useContractOtpSchema';
import { TerminalFlagEnum } from '~/graphql/graphql';
interface Props {
  mobile: string;
  remaining: number;
  domain: string;
  resetTimer: boolean;
  contractTemplateId: string;
  isNewTerminal?: boolean;
  isLoadingVerify?: boolean;
  flag?: TerminalFlagEnum;
}
interface Handler {
  type: 'error' | 'success' | 'info';
  message: string;
}
interface CustomGraphQLError extends GraphQLError {
  fa_message?: string;
  readable_code?: string;
}
type validateType = 'otp';

const props = withDefaults(defineProps<Props>(), {
  isNewTerminal: false,
  flag: TerminalFlagEnum.Normal,
});
const { contractTemplateId, domain, isNewTerminal, remaining, isLoadingVerify, flag } =
  toRefs(props);
const emit = defineEmits(['close', 'verified']);
const t = useI18n();
const { senOtp, verifyOtp } = useTerminalContractMutation();
const { refetch: refetchTerminalMenu, loading: isRefetchingTerminalMenu } = useTerminalMenuQuery();
const { mutate: senOtpMutate, loading: isSendOtpLoading } = senOtp();
const { schema } = useContractOtpSchema();
const { errors, setFieldError } = useForm({
  validationSchema: schema,
});
const handler: Ref<Handler> = ref({ type: 'info', message: '' });
const { snakeToCamel } = useSnakeToCamel();
const { $notify } = useNuxtApp();
const {
  mutate: verifyOtpMutate,
  loading: isVerifyOtpLoading,
  onDone: verifyOtpOnDone,
  onError: verifyOtpOnError,
} = verifyOtp((input, message, params) =>
  setFieldError(snakeToCamel(input) as validateType, t('_validation.' + message, params))
);
const isLoading = computed(
  () =>
    isSendOtpLoading.value ||
    isVerifyOtpLoading.value ||
    isRefetchingTerminalMenu.value ||
    isLoadingVerify.value
);
const resendOtp = async () => {
  await senOtpMutate({
    contract_template_id: contractTemplateId.value,
    entity: flag.value === TerminalFlagEnum.Normal ? domain.value : `zarinp.al/${domain.value}`,
  });
};
const verifyOTP = (code: string) => {
  if (isNewTerminal.value) {
    emit('verified', code);
  } else {
    verifyOtpMutate({
      otp_code: code,
      contract_template_id: contractTemplateId.value,
      entity: domain.value,
    });
  }
};
verifyOtpOnDone(async () => {
  await refetchTerminalMenu();
  $notify({
    isRead: false,
    message: t('_terminal.contract_alert.sign_success'),
    type: 'success',
  });
  emit('verified');
});

provide('errors', errors);

verifyOtpOnError(error => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0] as CustomGraphQLError;

    handler.value = {
      type: 'error',
      message: graphQLError.fa_message ?? graphQLError.message,
    };
  }
});
</script>
