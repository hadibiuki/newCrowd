<template>
  <div class="root">
    <!-- status filter -->
    <ui-Filter
      ref="filterRef"
      :content="FilterBox"
      :placeholder="$t('_common.filters.placeholder')"
      :value="selectedFilter"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import FilterCard from './FilterCard.vue';
import { useSessionFilter } from '@/composables/session/useSessionFilter';
import { TransactionStateEnum } from '~/consts/transactions';

const t = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const { statusList } = useSessionFilter();
const selectedFilter = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
const filteredValue = (value: TransactionStateEnum) =>
  statusList.value.filter(i => i.value === Number(value))[0]?.label;
// call action
const FilterValues = (value: TransactionStateEnum) => {
  if (value !== TransactionStateEnum.ALL) {
    selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(value)}`;
  }
  router.push({ query: { ...route.query, status: value, page: config.public.page } });
  closer.value();
};
const closeCard = (v: () => void) => {
  closer.value = v;
};
const clearFilter = () => {
  const query: any = {
    ...route.query,
    pageSize: Number(route.query.pageSize) || config.public.pageSize,
    page: config.public.page,
  };
  if (query.status) {
    delete query.status;
  }
  router.push({
    query,
  });
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const FilterBox = h(FilterCard, {
  isShow,
  onAction: FilterValues,
  onClear: clearFilter,
});
watch(
  () => route.query,
  () => {
    const status = filteredValue(route.query.status as unknown as TransactionStateEnum);
    if (status) {
      selectedFilter.value = `${t('_common.filters.placeholder')}: ${filteredValue(
        route.query.status as unknown as TransactionStateEnum
      )}`;
    } else {
      clearFilter();
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.root {
  @apply flex justify-end;
}
</style>
