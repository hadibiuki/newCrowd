import { ReconcileTypeEnum, type ReconciliationStatusEnum } from '@/graphql/graphql';

/**
 * handle status generate
 */
export function useReconciliationStatus() {
  const t = useI18n();
  const { active } = useActiveTerminal();
  const getStatusInfo = (value: ReconciliationStatusEnum) => {
    switch (value) {
      case 'ALL':
        return {
          text: t('status.ALL'),
          type: 'positive',
        };
      case 'PAID':
        return {
          text: t('status.REACHED_AMOUNT'),
          type: 'positive',
        };
      case 'REJECTED':
        return {
          text: t('status.REJECTED'),
          type: 'negative',
        };
      case 'IN_PROGRESS':
        return {
          text:
            active.reconcile_type === ReconcileTypeEnum.Wallet
              ? t('status.IN_QUEUE')
              : t('status.PENDING_SHAPARAK'),
          type: 'informative',
        };
      case 'REVERSED':
        return {
          text: t('status.REVERSED'),
          type: 'negative',
        };
      case 'PENDING':
        return {
          text: t('status.PENDING'),
          type: 'neutral',
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
