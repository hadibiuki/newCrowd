<template>
  <div class="pb-3xl w-full container-xl">
    <ticketBaseHeader />
    <ticketBaseMain @reset="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { getAllTicketsApi } from '~/restApi/ticket';

const route = useRoute();
const t = useI18n();
useHead({
  title: t('_common.page_title.tickets'),
});
definePageMeta({
  name: 'ticket',
});
type PaginationTypes = {
  value: any;
  page?: number;
  total?: number;
  pageSize?: number;
  totalPages?: number;
};

const pagination: PaginationTypes = ref({
  page: route.query.page || 1,
  total: 150,
  pageSize: route.query.pageSize || 5,
  totalPages: 1,
});
const loading = ref(true);
const data = ref([]);
const store = useTicketStore();
store.data = data;
store.loading = loading;
store.pagination = pagination;

onMounted(() => {
  fetchData();
});

async function fetchData() {
  loading.value = true;
  const customData = await getAllTicketsApi({
    pageNumber: route.query.page || pagination.value.page,
    pageSize: route.query.pageSize || pagination.value.pageSize,
  });
  data.value = customData.data.items;
  pagination.value.total = customData.data.totalItems;
  pagination.value.totalPages = customData.data.totalPages;
  loading.value = false;
}

watch(
  () => route.query,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetchData();
    }
  }
);
</script>
