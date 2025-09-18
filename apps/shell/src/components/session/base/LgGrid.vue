<template>
  <div>
    <ui-Table :columns="columns" :items="data" :loading="loading" @click-row="clicked">
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
      <template #item-description="{ description }">
        <!-- <ui-Label
            v-if="amount < 0"
            :text="$t('common.investmen')"
            type="neutral"
            class="w-full"
          /> -->
        <span class="truncate full-width">{{ description }}</span>
      </template>
      <template #item-amount="{ amount }">
        <div :class="amount < 0 ? 'text-text-danger' : ''" class="flex items-center gap-sm">
          <span dir="ltr">{{
            amount < 0 ? '-' + numberFormat(amount * -1) : numberFormat(amount)
          }}</span>
        </div>
      </template>

      <template #item-created_at="{ createdDate }">
        {{
          toJalali(
            createdDate,
            'jDD jMMMM jYYYY, HH:mm',
            'jDD jMMMM jYYYY, HH:mm',
            'jDD jMMMM jYYYY, HH:mm',
            'jDD jMMMM jYYYY, HH:mm'
          )
        }}
      </template>

      <!-- status template -->
      <template #item-status="{ state }">
        <div class="h-fit flex gap-2xs">
          <ui-Status :text="getStatusInfo(state).text" :type="getStatusInfo(state).type" />
        </div>
      </template>

      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
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
import { storeToRefs } from 'pinia';
const { columns } = useSessionColumns();
const { getStatusInfo } = useSessionStatus();
const { toJalali } = useDate();
const sessionStore = useSessionStore();
const { loading, data, detailesData, showModal } = storeToRefs(sessionStore);
const config = useRuntimeConfig();
const route = useRoute();
const { numberFormat } = useMath();
const clicked = (item: { id: string | number }) => {
  detailesData.value = item;
  showModal.value = true;
};
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
