<template>
  <ui-PageHeading
    sticky
    has-back
    :title="data?.title"
    :status="data?.status && statusHandler(data.status.id as TicketStatusEnum)"
    :description="
      $t('_common.pageHeading.ticket_details_description_id', {
        id: data?.reference_number,
      })
    "
    :loading="loading"
    size="2xl"
    @back-roll="backrollHandler"
  >
    <template #action>
      <ui-Button
        v-if="data?.status.id !== TicketStatusEnum.CLOSED"
        :loading="loading"
        type="tertiary"
        :text="$t('_common.buttons.close_ticket')"
        @click.stop="closeTicket()"
      />
    </template>
  </ui-PageHeading>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTicketStatus } from '@/composables/ticket/useTicketStatus';
import { TicketStatusEnum } from '~/consts/ticket';

const ticketStore = useTicketStore();
const { detailsData: data, detailsLoading: loading } = storeToRefs(ticketStore);
const { statusHandler } = useTicketStatus();
const closeTicket = () => {
  ticketStore.showConfirmModal = true;
};
const router = useRouter();
const backrollHandler = () => {
  router.push('/panel/ticket');
};
</script>
