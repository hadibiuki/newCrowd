import { ref } from 'vue';

export function useReconciliationWagesColumns() {
  const t = useI18n();
  const columns = ref([
    {
      id: 1,
      label: t('_bank_account.account'),
      name: 'iban',
      width: '47%',
    },
    {
      id: 2,
      label: t('_common.slug.rrn'),
      name: 'rrn',
      width: '28%',
    },
    {
      id: 3,
      label: t('reconcilation.reconcileDetail.amount'),
      name: 'amount',
      width: '25%',
    },
  ]);

  return {
    columns,
  };
}
