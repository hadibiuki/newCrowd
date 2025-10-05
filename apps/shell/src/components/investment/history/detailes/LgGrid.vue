<template>
  <div>
    <ReferralBaseEmptyGrid v-if="!loading && data && data?.length === 0" />
    <ui-Table v-else-if="data || loading" :columns="columns" :items="data" :loading="loading">
      <!-- commission template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <template #item-amount="{ amount }">
        <span>{{ numberFormat(amount) }}</span>
      </template>
      <template #item-date="{ purchaseDate }">
        {{ toJalali(purchaseDate) }}
      </template>
    </ui-Table>
    <!-- <InvoiceBaseNoResult v-if="!loading && !data" /> -->
  </div>
</template>

<script setup lang="ts">
import { UserReferred } from '@/graphql/graphql';
const { numberFormat } = useMath();
const { toJalali } = useDate();
export interface Props {
  data: UserReferred[];
  loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
const { data } = toRefs(props);
const columns = ref([
  {
    id: 1,
    label: 'مبلغ',
    name: 'amount',
    width: '20%',
  },
  {
    id: 2,
    label: 'عنوان',
    name: 'typeText',
    width: '20%',
  },
  {
    id: 3,
    label: 'تاریخ',
    name: 'date',
    width: '25%',
  },
  {
    id: 4,
    label: 'کد رهگیری',
    name: 'trackingCode',
    width: '35%',
  },
]);
</script>
