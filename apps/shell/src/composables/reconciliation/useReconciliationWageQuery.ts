import { PaginationType, Query, ReconciliationWageTypeEnum } from '@/graphql/graphql';
import { computed } from 'vue';

import type { ReconcileWageTypeCustom } from '~/types/reconcileWageTypeCustom';

import { RECONCILIATION_WAGES_PAGE_SIZE } from '~/consts/reconciliation';

export const useReconciliationWages = () => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const { active } = useActiveTerminal();
  const { activeTerminal } = useTerminalQuery();
  const { formattedAmount, wageTypeLabel, wageTypeLink } = useReconciliationWageHelpers();
  const { loading, onResult, refetch, result } = useQuery<Query>(
    ReconciliationWagesSchema,
    {
      limit: RECONCILIATION_WAGES_PAGE_SIZE,
      offset: RECONCILIATION_WAGES_PAGE_SIZE * (config.public.page - 1),
      pagination: true,
      reconciliation_id: route.params.id,
      terminal_id: active.id,
    },
    {
      fetchPolicy: 'no-cache',
    }
  );
  const filteredData = computed<ReconcileWageTypeCustom[] | undefined>(() => {
    if (result.value?.ReconciliationWages && _isArray(result.value?.ReconciliationWages)) {
      return result.value.ReconciliationWages?.map(item => ({
        ...item,
        formatted_amount: formattedAmount(item?.amount, item?.fee),
        is_default: activeTerminal?.value?.preferred_bank_account_id === item?.bank_account?.id,
        label: item?.type ? wageTypeLabel(item.type) : undefined,
        link:
          item?.type && item?.type_id
            ? wageTypeLink(item.type, item.type_id as unknown as ReconciliationWageTypeEnum)
            : undefined,
      }));
    }
    if (typeof result.value?.ReconciliationWages === 'undefined') {
      return undefined;
    }

    return [];
  });
  const pagination = computed<null | PaginationType>(() => {
    if (result.value && !_isEmpty(result.value.Pagination)) {
      if (result.value?.Pagination) {
        return result.value?.Pagination[0];
      }
    }

    return null;
  });

  return {
    data: filteredData,
    loading,
    onResult,
    pagination,
    refetch,
  };
};
export const useReconciliationWageQuery = () => ({
  useReconciliationWages,
});
