<template>
  <ui-Pagination
    v-if="pagination"
    :current-page="pagination.page"
    :rows="+pagination.total"
    :pages="pagination.totalPages"
    :loading="fetchLoading.value"
    :page-size="pagination.pageSize"
    @page-size-selected="setPageSize"
    @page-selected="setPage"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const config = useRuntimeConfig();
const sessionStore = useSessionStore();
const { loading, pagination } = storeToRefs(sessionStore);
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
</script>
