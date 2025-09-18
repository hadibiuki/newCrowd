<template>
  <div>
    <ui-Table :columns="columns" :items="wages" :is-pointer="false">
      <!-- iban template -->
      <template #item-iban="{ bank_account, is_default, type_id, label, link }">
        <div class="flex items-center gap-sm">
          <div
            v-if="bank_account?.issuing_bank?.slug_image"
            class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
          >
            <ui-BankLogo :name="bank_account?.issuing_bank?.slug" class="w-[24px] h-[24px]" />
          </div>
          <div class="flex flex-col gap-2xs">
            <span class="font-Mono text-body-400-b3">{{ bank_account?.iban }}</span>
            <div v-if="type_id" class="flex text-text-soft text-caption-400-c1">
              {{ label }}
              <NuxtLink :to="link">
                <ui-Button :text="`( ${type_id} )`" variant="text" />
              </NuxtLink>
            </div>
            <span v-else-if="is_default" class="text-caption-400-c1 text-text-soft">
              {{ t('reconcilation.reconcileDetail.reconcileDefaultAccount') }}
            </span>
            <span v-else class="text-caption-400-c1 text-text-soft">{{
              bank_account?.holder_name
            }}</span>
          </div>
        </div>
      </template>
      <!-- rnn column template -->
      <template #item-rrn="{ shaparak_tracking_number }">
        <div class="flex items-center gap-sm text-body-400-b2">{{ shaparak_tracking_number }}</div>
      </template>
      <!-- amount column template -->
      <template #item-amount="{ formatted_amount }">
        <div class="flex items-center text-body-400-b2">
          {{ formatted_amount }}
        </div>
      </template>
    </ui-Table>
    <ReconciliationWagesLgGridLoading v-if="loading" />
  </div>
</template>
<script lang="ts" setup>
import bankCard from '@zarinpal/ui/src/components/bankcard/bankCard';

import type { ReconcileWageTypeCustom } from '~/types/reconcileWageTypeCustom';

export interface Props {
  data: ReconcileWageTypeCustom[];
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const t = useI18n();
const { columns } = useReconciliationWagesColumns();
const { cardHandler } = bankCard();
const wages = computed(
  () =>
    data.value?.map(item => ({
      ...item,
      class: item.is_default
        ? `border-r-2 !border-solid border-[${cardHandler(
            item?.bank_account?.issuing_bank?.slug as string
          )}]`
        : '',
    }))
);
</script>
