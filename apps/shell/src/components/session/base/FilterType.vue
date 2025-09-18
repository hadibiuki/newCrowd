<template>
  <div class="root">
    <!-- status filter -->
    <ui-Filter
      ref="filterRef"
      :content="FilterType"
      :placeholder="$t('common.transaction_type')"
      :value="selectedType"
      @close="closeCard"
      @clear="clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
import TypeList from './TypeList.vue';
import { TransactionTypeEnum } from '~/consts/transactions';

const t = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const router = useRouter();
const { typeList } = useSessionFilter();
const selectedType = ref<string>();
const closer: Ref<() => void> = ref(() => {});
const filterRef = ref();
const filteredValue = (value: TransactionTypeEnum) =>
  typeList.value.filter(i => i.value === Number(value))[0]?.label;
const FilterValues = (value: TransactionTypeEnum) => {
  if (value !== TransactionTypeEnum.ALL) {
    selectedType.value = `${t('transactions.transaction_type')}: ${filteredValue(value)}`;
  }
  router.push({ query: { ...route.query, type: value, page: config.public.page } });
  closer.value();
};
const closeCard = (v: () => void) => {
  closer.value = v;
};
const clearFilter = () => {
  router.push({
    query: {
      ...route.query,
      pageSize: Number(route.query.pageSize) || config.public.pageSize,
      page: config.public.page,
      type: undefined,
    },
  });
};
const isShow = computed(() => filterRef.value?.tippyRef?.state?.isShown);
const FilterType = h(TypeList, {
  isShow,
  onAction: FilterValues,
  onClear: clearFilter,
});
watch(
  () => route.query,
  () => {
    const type = filteredValue(route.query.type as unknown as TransactionTypeEnum);
    if (type) {
      selectedType.value = `${t('common.transaction_type')}: ${type}`;
    } else {
      selectedType.value = undefined;
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
