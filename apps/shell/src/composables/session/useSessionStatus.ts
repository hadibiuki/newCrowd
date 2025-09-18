import { TransactionStateEnum } from '~/consts/transactions';

export function useSessionStatus() {
  const t = useI18n();
  const getStatusInfo = (value: TransactionStateEnum) => {
    switch (value) {
      case 5: //IN_SETTLEMENT_PROGRESS
        return {
          text: t('status.IN_SETTLEMENT_PROGRESS'),
          type: 'positive',
        };
      case 3:
        return {
          text: t('status.PENDING'),
          type: 'warning',
        };
      case 2:
        return {
          text: t('status.UNSUCCESS'),
          type: 'negative',
        };
      case 7: //FAILED_TO_SETTLEMEMNT
        return {
          text: t('status.FAILED_TO_SETTLEMEMNT'),
          type: 'informative',
        };
      case 1:
        return {
          text: t('status.SUCCESS'),
          type: 'positive',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return {
    getStatusInfo,
  };
}
