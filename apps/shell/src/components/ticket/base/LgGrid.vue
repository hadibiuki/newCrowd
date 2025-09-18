<template>
  <div>
    <ui-Table :columns="columns" :items="data" :loading="loading" @click-row="clicked">
      <template #item-id="{ status, reference_number }">
        <div class="flex items-center gap-sm">
          <ui-Avatar
            v-if="status.id !== TicketStatusEnum.CLOSED"
            type="Letter"
            shape="square"
            class-icon="!text-primary"
          />
          <ui-Avatar v-else type="LetterOpen" shape="square" />
          <span>{{ reference_number }}</span>
        </div>
      </template>

      <template #item-updated="{ updated_at }">
        <div class="flex items-center gap-sm">
          <span>{{ updated_at ? toJalali(updated_at) : '_' }}</span>
        </div>
      </template>
      <!-- status template -->
      <template #item-status="{ status }">
        <div class="h-fit">
          <ui-Status :text="statusHandler(status.id).text" :type="statusHandler(status.id).type" />
        </div>
      </template>
      <!-- action template -->
      <template #item-action="{ id, status, rating }">
        <div v-if="status.id !== TicketStatusEnum.CLOSED" class="flex justify-end">
          <ui-Action
            :id="id"
            v-model:eventType="eventType"
            :selected-id="idValue"
            :limit="1"
            :items="actionHandle(handleShowModal)"
            dir="rtl"
            @id-value="idValueHandler"
          />
        </div>
        <div v-else-if="!rating" class="justify-self-end">
          <ui-Button
            icon="RatingEdit"
            type="tertiary"
            class="w-2xl h-2xl z-20"
            @click.stop="rateModalToggle(id)"
          />
        </div>
      </template>
      <!-- loading template -->
      <template #loadingSkeleton>
        <div v-for="index in pageSize" :key="index" class="loading">
          <div
            class="grid border-t border-t-border-divider"
            style="
              grid-template-columns:
                190px minmax(100px, 420px) minmax(160px, 150px) minmax(130px, 160px)
                minmax(60px, 1fr);
            "
          >
            <div class="flex items-center">
              <ui-Skeleton :width="40" :height="40" class="px-md py-md" radius="md" />
              <ui-Skeleton :width="104" :height="12" class="px-sm py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="104" :height="12" class="px-md py-md" />
            </div>
            <div class="my-auto">
              <ui-Skeleton :width="60" :height="12" class="px-md py-md" />
            </div>
          </div>
        </div>
      </template>
    </ui-Table>
    <SharedShareModalConfirm
      v-if="showConfirm"
      cancel-label="_common.buttons.cancel"
      submit-label="_common.buttons.ticket_submit"
      description="_helper.addTicket.ticket_confirm_description"
      title="_common.buttons.close_ticket"
      :loading="loading"
      @close="closeConfirm"
      @confirm="handleConfirm"
      @cancel="closeConfirm"
    />
    <ui-Modal
      v-if="rateToggle"
      header
      close-icon
      class="w-full lib-view lg:max-w-[400px] !lg:max-h-[400px] h-[230px]"
      :text="$t('_common.modal.feedback')"
      @close="rateModalToggle"
    >
      <template #body>
        <div dir="ltr">
          <ui-Rate
            class="text-center"
            :text="$t('_common.rate.ticketText')"
            @selected="rateActionHandler"
          />
        </div>
      </template>
    </ui-Modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTicketColumns } from '@/composables/ticket/useTicketColumns';
import { useTicketStatus } from '@/composables/ticket/useTicketStatus';
import { TicketStatusEnum } from '~/consts/ticket';
import { updateTicketApi } from '~/restApi/ticket';
const { toJalali } = useDate();
const emits = defineEmits(['reset']);
const { $notify } = useNuxtApp();
const t = useI18n();
const { columns } = useTicketColumns();
const { statusHandler } = useTicketStatus();
const ticketStore = useTicketStore();
const { loading, data } = storeToRefs(ticketStore);
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const rateToggle = ref(false);
const showConfirm = ref(false);
const rateSelectedId = ref<string>();
const idValue = ref();
const eventType = ref();
const { actionHandle } = useTicketAction();
const closeTicket = () => {
  updateTicketApi(idValue.value as string, {
    status: TicketStatusEnum.CLOSED,
  })
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res) {
        $notify({
          isRead: false,
          message: t('_helper.addTicket.ticked_closed'),
          type: 'success',
        });
        closeConfirm();
        rateModalToggle(idValue.value);

        emits('reset');
      }
    })
    .catch((err: Error) => {
      const message = err?.details?.message || t('common.somethingWrong');
      $notify({
        isRead: false,
        message,
        type: 'error',
      });
    });
};
const closeConfirm = () => {
  showConfirm.value = false;
};
const handleShowModal = () => {
  showConfirm.value = true;
};
const handleConfirm = () => {
  closeTicket();
};
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const clicked = (item: { id: string | number }) => {
  router.push(`/panel/ticket/${item.id}`);
};
const rateActionHandler = (value: number) => {
  updateTicketApi(rateSelectedId.value as string, {
    rating: value,
  })
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res) {
        $notify({
          isRead: false,
          message: t('common.success'),
          type: 'success',
        });
        rateModalToggle();

        emits('reset');
      }
    })
    .catch((err: Error) => {
      const message = err?.details?.message || t('common.somethingWrong');
      $notify({
        isRead: false,
        message,
        type: 'error',
      });
    });
};
/**
 * open rate modal
 * @param rateToggle boolean
 */
const rateModalToggle = (id?: string) => {
  if (id) {
    rateToggle.value = !rateToggle.value;
    rateSelectedId.value = id;
  } else {
    ticketStore.ticketSelectedRate = null;
    rateToggle.value = !rateToggle.value;
  }
};
onMounted(() => {
  if (ticketStore.ticketSelectedRate) {
    rateModalToggle(ticketStore.ticketSelectedRate);
    setTimeout(() => {
      if (ticketStore.ticketSelectedRate) {
        ticketStore.ticketSelectedRate = null;
        rateToggle.value = false;
      }
    }, 7000);
  }
});
const pageSize = computed(() => Number(route.query.pageSize) || config.public.pageSize);
</script>
