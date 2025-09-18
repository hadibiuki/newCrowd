<template>
  <ui-Skeleton v-if="loading" :height="400" full-width />
  <div v-else v-html="data"></div>
</template>

<script setup lang="ts">
import { ContractTypeEnum } from '~/graphql/graphql';

const props = defineProps<{
  contractTemplateRoute: string;
}>();
const { contractTemplateRoute } = toRefs(props);
const { loading: contractTemplateLoading } = useContractTemplatesQuery(ContractTypeEnum.Terminal);
const {
  data,
  fetchContract,
  loading: contractLoading,
} = useTerminalContract(contractTemplateRoute.value);
const loading = computed(() => contractTemplateLoading.value || contractLoading.value);

onMounted(() => {
  fetchContract();
});
</script>

<style lang="scss" scoped>
:deep(table),
:deep(tr),
:deep(td),
:deep(th) {
  @apply border border-gray-100 p-2xs;
}
:deep(table) {
  @apply w-full;
}
:deep(a) {
  @apply text-primary;
}
</style>
