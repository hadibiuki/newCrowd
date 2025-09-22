/**
 * handle status generate
 */

export enum BankAccountStatusEnum {
  ACTIVE = 1,
  INACTIVE = 2,
  PENDING = 3,
}
export const useBankAccountStatus = () => {
  const t = useI18n();
  const getStatusInfo = (value: BankAccountStatusEnum) => {
    switch (value) {
      case BankAccountStatusEnum.ACTIVE:
        return {
          text: t('_common.status.ACTIVE'),
          type: 'positive',
        };
      case BankAccountStatusEnum.INACTIVE:
        return {
          text: t('_common.status.INACTIVE'),
          type: 'neutral',
        };
      case BankAccountStatusEnum.PENDING:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
      // case BankAccountStatusEnum.PendingShaparak:
      //   return {
      //     text: t('_common.status.account.PENDING_SHAPARAK'),
      //     type: 'warning',
      //   };
      // case BankAccountStatusEnum.Rejected:
      //   return {
      //     text: t('_common.status.REJECTED'),
      //     type: 'negative',
      //   };
      // case BankAccountStatusEnum.RejectedShaparak:
      //   return {
      //     text: t('_common.status.REJECTED_SHAPARAK'),
      //     type: 'negative',
      //   };
      // case BankAccountStatusEnum.ZarinCardPending:
      //   return {
      //     text: t('_common.status.account.ZARIN_CARD_PENDING'),
      //     type: 'informative',
      //   };
      default:
        return {
          text: t('_common.status.PENDING'),
          type: 'warning',
        };
    }
  };

  return {
    getStatusInfo,
  };
};
