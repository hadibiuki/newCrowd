<template>
  <div class="pb-3xl w-full container-xl">
    <sessionBaseHeader />
    <sessionBaseMain />
    <sessionBaseModal
      :show-template-modal="store.showModal"
      :platforms="platforms"
      @close="store.showModal = false"
    />
  </div>
</template>
<script setup lang="ts">
import { getAllPlatformsApi, getAllTransacionsApi } from '~/restApi/transactions';
const { toGregorian } = useDate();
definePageMeta({
  name: 'session',
  layout: 'terminal',
});
const t = useI18n();
useHead({
  title: t('common.sessions'),
});
const route = useRoute();
const loading = ref(true);
const data = ref([]);
const detailes = ref({});
const pagination = ref({
  page: route.query.page || 1,
  total: 150,
  pageSize: route.query.pageSize || 5,
  totalPages: 1,
});
const store = useSessionStore();
store.loading = loading;
store.refetch = getAllTransacionsApi;
store.pagination = pagination;
store.detailesData = detailes;
store.data = data;

async function refetchData() {
  loading.value = true;
  const body = {
    pageNumber: route.query.page || pagination.value.page,
    pageSize: route.query.pageSize || pagination.value.pageSize,
    dateFrom: route.query.from ? toGregorian(route.query.from as string) : null,
    dateTo: route.query.to ? toGregorian(route.query.to as string) : null,
    search: route.query.id || null,
    type: route.query.type || null,
  };

  if (route.query.status) {
    body.state = route.query.status;
  }
  const customData = await getAllTransacionsApi(body);

  data.value = customData.data.items;
  pagination.value.total = customData.data.totalItems;
  pagination.value.totalPages = customData.data.totalPages;
  loading.value = false;
}
const platforms = ref([]);
onMounted(() => {
  refetchData();
  // eslint-disable-next-line promise/catch-or-return
  getAllPlatformsApi().then(res => {
    // eslint-disable-next-line promise/always-return
    if (res && res.data) {
      platforms.value = res?.data?.items;
    }
  });
});
watch(
  () => route.query,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      refetchData();
    }
  }
);
</script>
