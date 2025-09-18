import type { FilterList } from '@/types/filterList';

import { FilterEnum } from '@/graphql/graphql';

import { TransactionStateEnum, TransactionTypeEnum } from '~/consts/transactions';

/**
 * handle filter generate
 */
export function useSessionFilter() {
  const t = useI18n();
  const list = reactive<FilterList[]>([
    {
      checked: false,
      label: t('_common.status.ALL'),
      value: FilterEnum.All,
    },
    {
      checked: false,
      label: t('status.SUCCESS'),
      value: FilterEnum.Active,
    },
    {
      checked: false,
      label: t('status.FINALIZED'),
      value: FilterEnum.Verified,
    },

    {
      checked: false,
      label: t('status.NOT_FINALIZED'),
      value: FilterEnum.Paid,
    },
    {
      checked: false,
      label: t('status.UNSUCCESS'),
      value: FilterEnum.Trash,
    },
    {
      checked: false,
      label: t('status.REFUNDED'),
      value: FilterEnum.Refunded,
    },
  ]);
  const statusHandler = (value: FilterEnum) => {
    switch (value) {
      case FilterEnum.All:
        return {
          text: t('_common.status.ALL'),
          type: 'All',
        };
      case FilterEnum.Active:
        return {
          text: t('_common.status.SUCCESS'),
          type: 'Active',
        };

      case FilterEnum.Verified:
        return {
          text: t('_common.status.FINALIZED'),
          type: 'Verified',
        };
      case FilterEnum.Paid:
        return {
          text: t('_common.status.NOT_FINALIZED'),
          type: 'Paid',
        };
      case FilterEnum.Trash:
        return {
          text: t('_common.status.UNSUCCESS'),
          type: 'Trash',
        };
      case FilterEnum.Refunded:
        return {
          text: t('_common.status.REFUND'),
          type: 'Refunded',
        };
      default:
        return {
          text: '',
        };
    }
  };
  const statusList = ref([
    {
      label: t('status.SUCCESS'),
      value: TransactionStateEnum.SUCCESS,
    },
    {
      label: t('status.UNSUCCESS'),
      value: TransactionStateEnum.UNSUCCESS,
    },
    {
      label: t('status.PENDING'),
      value: TransactionStateEnum.PENDING,
    },
    {
      label: t('status.IN_SETTLEMENT_PROGRESS'),
      value: TransactionStateEnum.IN_SETTLEMENT_PROGRESS,
    },
    {
      label: t('status.FAILED_TO_SETTLEMEMNT'),
      value: TransactionStateEnum.FAILED_TO_SETTLEMEMNT,
    },
  ]);
  const typeList = ref([
    {
      label: t('transactions.deposit_whit_receipt'),
      name: TransactionTypeEnum.DEPOSIT_WHIT_RECEIPT,
      value: TransactionTypeEnum.DEPOSIT_WHIT_RECEIPT,
    },
    {
      label: t('transactions.introduction'),
      name: TransactionTypeEnum.INTRODUCTION,
      value: TransactionTypeEnum.INTRODUCTION,
    },
    {
      label: t('transactions.investment'),
      name: TransactionTypeEnum.INVESTMENT,
      value: TransactionTypeEnum.INVESTMENT,
    },
    {
      label: t('transactions.investment_profit'),
      name: TransactionTypeEnum.INVESTMENT_PROFIT,
      value: TransactionTypeEnum.INVESTMENT_PROFIT,
    },
    {
      label: t('transactions.investment_return'),
      name: TransactionTypeEnum.INVESTMENT_RETURN,
      value: TransactionTypeEnum.INVESTMENT_RETURN,
    },

    {
      label: t('transactions.investment_return_funds'),
      name: TransactionTypeEnum.INVESTMENT_RETURN_FUNDS,
      value: TransactionTypeEnum.INVESTMENT_RETURN_FUNDS,
    },
    {
      label: t('transactions.modification'),
      name: TransactionTypeEnum.MODIFICATION,
      value: TransactionTypeEnum.MODIFICATION,
    },
    {
      label: t('transactions.wallet_charge'),
      name: TransactionTypeEnum.WALLET_CHARGE,
      value: TransactionTypeEnum.WALLET_CHARGE,
    },
    {
      label: t('transactions.wallet_settlment'),
      name: TransactionTypeEnum.WALLET_SETTLMENT,
      value: TransactionTypeEnum.WALLET_SETTLMENT,
    },
  ]);

  return {
    list,
    statusHandler,
    statusList,
    typeList,
  };
}
