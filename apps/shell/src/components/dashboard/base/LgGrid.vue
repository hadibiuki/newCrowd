<template>
  <div>
    <DashboardBaseEmptyGrid v-if="latestData && !latestData.length && !loading" />
    <ui-Table v-else :columns="columns" :items="latestData" :loading="loading" @click-row="clicked">
      <!-- amount template -->
      <template #column-amount="header">
        <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
          <div class="h-fit flex -mt-2xs">
            <span class="truncate">{{ header.label }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
          </div>
        </ui-Skeleton>
      </template>
      <!-- id column template -->
      <template #item-id="{ id }">
        <div class="flex items-center gap-sm">
          <span>{{ id }}</span>
        </div>
      </template>
      <!-- id column template -->
      <template #item-amount="{ amount }">
        <div :class="amount < 0 ? 'text-text-danger' : ''" class="flex items-center gap-sm">
          <span dir="ltr">{{
            amount < 0 ? '-' + numberFormat(amount * -1) : numberFormat(amount)
          }}</span>
        </div>
      </template>

      <template #item-created_at="{ createdDate }">
        {{ toJalali(createdDate) }}
      </template>
      <template #item-description="{ amount, description }">
        <div class="flex gap-sm overflow-hidden">
          <ui-Label v-if="amount === 0" :text="$t('common.fee')" type="neutral" />
          <span class="truncate full-width">{{ description }}</span>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ state }">
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="getStatusInfo(state).text" :type="getStatusInfo(state).type" />
        </div>
      </template>

      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in 5" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="grid-template-columns: 10% 15% 35% 15% 25%"
          >
            <div class="flex items-center">
              <ui-Skeleton :width="60" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
  </div>
</template>

<script setup lang="ts">
import { useSessionColumns } from '@/composables/session/useSessionColumns';
import { useSessionStatus } from '@/composables/session/useSessionStatus';
import { getAllTransacionsApi } from '~/restApi/transactions';
const { toJalali } = useDate();

export interface Props {
  loading: boolean;
}
const { columns } = useSessionColumns();
const { getStatusInfo } = useSessionStatus();
const { numberFormat } = useMath();
const store = useSessionStore();
const latestData = computed(() => {
  if (data.value && data.value) {
    return data.value.slice(0, 5);
  }

  return [];
});
const data = ref([]);
const loading = ref(false);
async function refetchData() {
  loading.value = true;
  const body = {
    pageNumber: 1,
    pageSize: 5,
  };
  const customData = await getAllTransacionsApi(body);

  data.value = customData.data.items;
  loading.value = false;
}
const clicked = (item: { id: string | number }) => {
  store.detailesData = item;
  store.showModal = true;
};
onMounted(() => {
  refetchData();
});
</script>
