import { Maybe, PaymentTerminalStatusEnum } from '@/graphql/graphql';

export const useTerminalPayoutStatus = () => {
  const t = useI18n();
  /**
   *  handle terminal status
   * @param value PaymentTerminalStatusEnum
   * @returns like: text,type
   */
  const statusHandler = (value: Maybe<PaymentTerminalStatusEnum> | undefined) => {
    switch (value) {
      case PaymentTerminalStatusEnum.Active:
        return {
          text: t('_common.status.ACTIVE'),
          type: 'positive',
        };
      case PaymentTerminalStatusEnum.DeActive:
        return {
          text: t('_common.status.INACTIVE'),
          type: 'neutral',
        };
      case PaymentTerminalStatusEnum.Pending:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case PaymentTerminalStatusEnum.InProgressDefineError:
        return {
          text: t('_common.status.zarin_gate.ERROR'),
          type: 'negative',
        };
      case PaymentTerminalStatusEnum.FollowupPspError:
        return {
          text: t('_common.status.zarin_gate.ERROR'),
          type: 'negative',
        };
      case PaymentTerminalStatusEnum.InProgressDefine:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case PaymentTerminalStatusEnum.InProgressPsp:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case PaymentTerminalStatusEnum.InProgressShaparak:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case PaymentTerminalStatusEnum.InProgressShaparakActive:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      case PaymentTerminalStatusEnum.InProgressShaparakError:
        return {
          text: t('_common.status.zarin_gate.ERROR'),
          type: 'negative',
        };

      case PaymentTerminalStatusEnum.Reject:
        return {
          text: t('_common.status.REJECTED'),
          type: 'negative',
        };

      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return { statusHandler };
};
