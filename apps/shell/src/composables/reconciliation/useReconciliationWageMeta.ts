import { ReconciliationWageTypeEnum } from '~/graphql/graphql';

export function useReconciliationWageHelpers() {
  const { activeTerminal } = useTerminalQuery();
  const t = useI18n();
  const { numberFormat } = useMath();
  const formattedAmount = (amount: string, fee: string) =>
    `${numberFormat(parseFloat(amount) - parseFloat(fee))} ${t('_common.currency.rial')}`;
  const wageTypeLink = (type: string, typeId: ReconciliationWageTypeEnum) => {
    const domain = encodeURIComponent(activeTerminal.value?.domain as string);
    switch (type) {
      case ReconciliationWageTypeEnum.Refund:
        return `/panel/${domain}/session/${typeId}`;
      case ReconciliationWageTypeEnum.Payout:
        return `/panel/${domain}/payout?url_code=${typeId}`;
      case ReconciliationWageTypeEnum.InstantPayout:
        return `/panel/${domain}/instant-payout?url_code=${typeId}`;

      default:
        return '';
    }
  };
  const wageTypeLabel = (type: string) => {
    switch (type) {
      case ReconciliationWageTypeEnum.Refund:
        return t('_session.show.time_line.refund');
      case ReconciliationWageTypeEnum.Payout:
        return t('_common.page_title.payout');
      case ReconciliationWageTypeEnum.InstantPayout:
        return t('_common.page_title.instant_payout');

      default:
        return '';
    }
  };

  return {
    formattedAmount,
    wageTypeLabel,
    wageTypeLink,
  };
}
