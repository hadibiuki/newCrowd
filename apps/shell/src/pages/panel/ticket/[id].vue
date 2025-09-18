<template>
  <div>
    <TicketDetailsHeader />
    <div class="container-lg pb-3xl px-md md:px-0">
      <TicketDetailsMain />
      <TicketDetailsReply @reset="fetchData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTicketsDetailesApi } from '~/restApi/ticket';

const ticketStore = useTicketStore();
const route = useRoute();
const t = useI18n();
const pageTitle = computed(() =>
  ticketStore.detailsData?.title ? ticketStore.detailsData?.title : t('_common.page_title.tickets')
);
useHead({
  title: pageTitle,
});

onMounted(() => {
  fetchData();
});

function fetchData(): void {
  ticketStore.detailsLoading = true;
  // eslint-disable-next-line promise/catch-or-return
  getTicketsDetailesApi(route.params.id)
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res) {
        ticketStore.detailsData = res.data;
      }
    })
    .finally(() => {
      ticketStore.detailsLoading = false;
    });
}
</script>
