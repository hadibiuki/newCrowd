<template>
  <div>
    <ReconciliationWagesMdGridLoading v-if="loading && searchText" />
    <template v-else>
      <ui-Bankcard
        v-for="item in data"
        :key="item"
        :logo="item?.bank_account?.issuing_bank?.slug"
        :iban="item?.bank_account?.iban"
        :description="
          item.is_default
            ? t('reconcilation.reconcileDetail.reconcileDefaultAccount')
            : item?.bank_account?.holder_name
        "
        :items="bankCardItems(item as ReconcileWageType)"
        :is-default="item.is_default"
        class="mt-xl"
      >
        <template v-if="item?.type_id" #description>
          <div class="flex">
            <span>{{ item.label }}</span>
            <NuxtLink :to="item.link">
              <ui-Button :text="`(${item.type_id})`" variant="text" />
            </NuxtLink>
          </div>
        </template>
      </ui-Bankcard>
      <ReconciliationWagesMdGridLoading v-if="loading && !searchText" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { type ReconcileWageType } from '@/graphql/graphql';
import type { ReconcileWageTypeCustom } from '~/types/reconcileWageTypeCustom';

export interface Props {
  data: ReconcileWageTypeCustom[];
  loading: boolean;
  searchText?: string;
}
withDefaults(defineProps<Props>(), {
  searchText: '',
});
const t = useI18n();
const { numberFormat } = useMath();
const bankCardItems = (item: ReconcileWageType) => {
  const result = [
    {
      label: t('_common.slug.amount'),
      value: `${numberFormat(item.amount - item.fee)} ${t('_common.currency.rial')}`,
    },
  ];
  if (item.shaparak_tracking_number) {
    result.push({
      label: t('_common.slug.rrn'),
      value: item.shaparak_tracking_number,
    });
  }

  return result;
};
</script>
