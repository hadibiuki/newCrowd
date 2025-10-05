<template>
  <div class="pb-3xl w-full container-xl">
    <investmentHistoryDetailesHeader :loading="loading" :title="detailes?.projectPersianName" />
    <investmentHistoryDetailesMain :loading="loading" :data="detailes" />
  </div>
</template>
<script setup lang="ts">
import { getInvestmentsDetailApi } from '~/restApi/invest';

definePageMeta({
  name: 'history_detailes',
  layout: 'terminal',
});
const loading = ref(true);
useHead({
  title: 'فرصت های سرمایه‌گذاری',
});
const route = useRoute();
const detailes = ref({});
onMounted(() => {
  // eslint-disable-next-line promise/catch-or-return
  getInvestmentsDetailApi(route?.params?.id)
    // eslint-disable-next-line promise/always-return
    .then(res => {
      detailes.value = res.data;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
