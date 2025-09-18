<template>
  <div>
    <ui-TableCard v-for="i in data" :key="i?.id" class="root">
      <template #header>
        <div class="root__header">
          <!-- id column -->
          <div class="root__header--id">
            <ui-Avatar v-if="!i?.seen" type="Letter" shape="square" class-icon="!text-primary" />
            <ui-Avatar v-else type="LetterOpen" shape="square" />
            <span class="root__header--id__text">{{ i?.reference_number }}</span>
          </div>
          <!-- status column -->
          <div class="root__header--status">
            <ui-Status
              :text="statusHandler(i?.status?.id).text"
              :type="statusHandler(i?.status?.id).type"
            />
          </div>
        </div>
      </template>
      <template #main>
        <!-- title column -->
        <div class="root__main--title">
          <div class="root__main--title__label">
            {{ columns[1].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.title }}
          </div>
        </div>
        <ui-Divider />
        <!-- date colum -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ columns[2].label }}
          </div>
          <div class="root__main--title__title">
            {{ i.updated_at ? toJalali(i.updated_at) : '_' }}
          </div>
        </div>
      </template>
      <template #footer>
        <!-- action column -->
        <div class="root__footer">
          <div class="root__footer__detail">
            <NuxtLink class="flex items-center" :to="`/panel/ticket/${i?.id}`" no-prefetch>
              <span>{{ $t('_common.table.detail') }}</span>
              <ui-Icon name="AngleLeft" />
            </NuxtLink>
          </div>
          <div class="root__footer__button">
            <div v-if="i?.status.id !== TicketStatusEnum.CLOSED" class="flex justify-end">
              <ui-Action
                :id="i.id"
                v-model:eventType="eventType"
                :selected-id="idValue"
                :limit="1"
                :items="actionHandle(handleShowModal)"
                dir="rtl"
                @id-value="idValueHandler"
              />
            </div>
            <ui-Button
              v-else-if="!i.rating"
              icon="RatingEdit"
              type="tertiary"
              class="w-2xl h-2xl z-20"
              @click.stop="rateModalToggle(i.id)"
            />
          </div>
        </div>
      </template>
    </ui-TableCard>
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
      class="w-full lib-view lg:max-w-[400px] !lg:max-h-[400px]"
      :text="$t('_common.modal.feedback')"
      @close="rateModalToggle"
    >
      <template #body>
        <div>
          <ui-Rate :text="$t('_common.rate.ticketText')" @selected="rateActionHandler" />
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
const { columns } = useTicketColumns();
const t = useI18n();
const { $notify } = useNuxtApp();
const rateToggle = ref(false);
const ticketStore = useTicketStore();
const { loading, data } = storeToRefs(ticketStore);
const { statusHandler } = useTicketStatus();
const idValue = ref();
const eventType = ref();
const { actionHandle } = useTicketAction();
const showConfirm = ref(false);
const rateSelectedId = ref();
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
</script>

<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between flex-wrap;
    &--id {
      @apply flex items-center gap-sm;
      &__text {
        @apply text-body-400-b2 text-text pl-sm;
      }
    }
    &--status {
      @apply -mt-sm items-center flex;
    }
  }
  &__main {
    &--title {
      @apply flex justify-between mb-sm;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
  &__footer {
    @apply flex justify-between;
    &__detail {
      @apply text-body-400-b2 text-primary font-medium my-auto;
    }
    &__button {
      @apply text-body-400-b2 text-text;
    }
  }
}
</style>
