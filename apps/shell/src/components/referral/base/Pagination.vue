<template>
  <div>
    <ui-Pagination
      v-if="pagination"
      :current-page="pagination.page"
      :rows="+pagination.total"
      :pages="pagination.totalPages"
      :loading="loading"
      :page-size="pagination.pageSize"
      @page-size-selected="setPageSize"
      @page-selected="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { PaginationType } from '@/graphql/graphql';

export interface Props {
  pagination: PaginationType;
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const { pagination, loading } = toRefs(props);
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const currentPage = ref(config.public.page);
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
    currentPage.value = (route.query.page && +route.query.page) || config.public.page;
  }
);
</script>
