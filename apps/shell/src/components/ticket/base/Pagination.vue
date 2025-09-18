<template>
  <div>
    <ui-Pagination
      v-if="pagination"
      :current-page="pagination.page"
      :rows="pagination.total"
      :pages="pagination.totalPages"
      :loading="fetchLoading.value"
      :page-size="pagination.pageSize"
      @page-size-selected="setPageSize"
      @page-selected="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const config = useRuntimeConfig();
const ticketStore = useTicketStore();
const { loading, pagination } = storeToRefs(ticketStore);
const fetchLoading = computed(() => loading);
const route = useRoute();
const router = useRouter();
/**
 * set route query page
 * @param value pageSize value from route query
 */
const setPageSize = (value: number) => {
  router.push({
    query: {
      ...route.query,
      page: config.public.page,
      pageSize: value,
    },
  });
};
/**
 * set route query page
 * @param value page value from route query
 */
const setPage = (value: number) => {
  router.push({
    query: {
      ...route.query,
      page: value,
    },
  });
};

watch(
  () => route.query,
  () => {
    pagination.value.page = (route.query.page && +route.query.page) || config.public.page;
  }
);
</script>
