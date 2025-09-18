import { i18n } from '@/locale/i18n';

const mutateSendOtpContractConfirm = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    SendOtpContractConfirmSchema
  );
  onError(error => {
    const { $notify } = useNuxtApp();
    const { t } = i18n.global;

    errorHandler(error, value => {
      value?.validation.forEach(element => {
        if (element.input === 'bank_account_id') {
          $notify({
            isRead: false,
            message: t('_validation.' + element.rule, {
              _field_: t(`_validation.name.${element.input}`),
              name: t(`_validation.name.select_${element.input}`),
            }),
            type: 'error',
          });
        }
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
const mutateVerifyOtpContractConfirm = (
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    VerifyOtpContractConfirmSchema
  );
  onError(error => {
    errorHandler(error, value => {
      value?.validation.forEach(element => {
        validationErrorsCb(element.input, element.rule, element.params);
      });
    });
  });

  return { called, error, loading, mutate, onDone, onError };
};
export const useTerminalContractMutation = () => {
  const senOtp = mutateSendOtpContractConfirm;
  const verifyOtp = mutateVerifyOtpContractConfirm;

  return {
    senOtp,
    verifyOtp,
  };
};
