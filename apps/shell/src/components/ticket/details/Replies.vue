<template>
  <ui-Card>
    <template #main>
      <div class="replies">
        <!-- loading -->
        <div v-if="loading">
          <TicketDetailsLoading v-for="i in 2" :key="i" :loading="loading" />
        </div>
        <!-- success -->
        <div v-else-if="replies && !!replies.length && !loading">
          <div>
            <TicketDetailsContentLoop />
            <div class="flex flex-col justify-center items-center gap-xs">
              <ui-Divider
                v-if="route.query.more !== 'full' && replies.length > 3"
                type="vertical"
                :height="24"
                class="mx-sm w-[1px]"
                border-style="dashed"
              />
              <ui-Button
                v-if="route.query.more !== 'full' && replies.length > 3"
                :text="$t('_common.buttons.load_more', { count: replies.length - 3 })"
                variant="outlined"
                @click="routeQueryHandler"
              />
              <ui-Divider
                v-if="route.query.more !== 'full' && replies.length > 3"
                type="vertical"
                :height="24"
                class="mx-sm w-[1px] mb-xl"
                border-style="dashed"
              />
            </div>
            <TicketDetailsContentLoop
              v-if="route.query.more !== 'full' && replies.length > 3"
              :drop="true"
            />
          </div>
        </div>
      </div>
      <!-- show rate if auto closed ticket -->
      <SharedShareModalConfirm
        v-if="ticketStore.showConfirmModal"
        cancel-label="_common.buttons.cancel"
        submit-label="_common.buttons.ticket_submit"
        description="_helper.addTicket.ticket_confirm_description"
        title="_common.buttons.close_ticket"
        :loading="closeTicketLoading"
        @close="closeConfirm"
        @confirm="handleConfirm"
        @cancel="closeConfirm"
      />
      <div
        v-if="data?.status !== TicketStatusEnum.CLOSED && showClose"
        class="flex flex-col justify-center items-center gap-md"
      >
        <ui-Icon name="QuestionCircle" />
        <div>{{ $t('_helper.addTicket.is_ticket_resolved') }}</div>
        <div class="flex gap-xs">
          <ui-Button
            :loading="loading || feedbackLoading || closeTicketLoading"
            type="tertiary"
            :text="$t('common.no')"
            @click="showClose = false"
          />
          <ui-Button
            :loading="loading || feedbackLoading || closeTicketLoading"
            type="tertiary"
            :text="$t('_common.buttons.close_ticket')"
            @click="handleShowModal"
          />
        </div>
      </div>
      <div v-if="rateToggle && data && !data.rate && (!loading || !feedbackLoading)">
        <div class="text-body-400-b3 text-text-soft font-medium text-center mx-auto">
          {{ $t('_common.rate.ticketText') }}
        </div>
        <div class="mb-xl mx-auto md:w-[20rem]">
          <ui-Rate class="text-center" @selected="rateActionHandler" />
        </div>
      </div>
    </template>
  </ui-Card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { updateTicketApi } from '~/restApi/ticket';
import { TicketStatusEnum } from '~/consts/ticket';

const { $notify } = useNuxtApp();
const t = useI18n();
const route = useRoute();
const router = useRouter();
const { substract } = useDate();
const ticketStore = useTicketStore();
const { detailsData: data, detailsLoading: loading } = storeToRefs(ticketStore);
const emits = defineEmits(['reset']);
const updateTime = computed(() => substract(data.value?.updated_at, 10, 'days'));
const showClose = ref(false);
// show rate for closed status
const rateToggle = computed(() => {
  if (
    data.value &&
    data.value.status === TicketStatusEnum.CLOSED &&
    updateTime.value &&
    !data.value.feedback_value
  ) {
    return true;
  }
});
const replies = computed(() => {
  if (data.value && _isArray(data.value.messages)) {
    const lastIndex = data.value.messages[data.value.messages.length - 1];
    const initialId = (data.value?.messages && data.value?.messages[0]?.user?.id) ?? '';
    if (lastIndex && initialId !== lastIndex?.user?.id) {
      showClose.value = true;
    }

    return data.value.messages;
  }
});
/**
 * This function handles the rate action.
 *
 * @param {number} value - The rate value to be set.
 */
const feedbackLoading = ref(false);
const rateActionHandler = (value: number) => {
  feedbackLoading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  updateTicketApi(route.params.id as string, {
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
    })
    .finally(() => {
      feedbackLoading.value = true;
    });
};
/**
 * Handle the route query by updating the query parameters and navigating to the new route.
 */
const routeQueryHandler = () => {
  router.push({
    query: {
      ...route.query,
      more: 'full',
    },
  });
};
const backrollHandler = () => {
  ticketStore.ticketSelectedRate = data.value.id;
  router.push('/panel/ticket');
};
const closeTicketLoading = ref(false);
const closeTicket = () => {
  closeTicketLoading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  updateTicketApi(data.value.id as string, {
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
        backrollHandler();
      }
    })
    .catch((err: Error) => {
      const message = err?.details?.message || t('common.somethingWrong');
      $notify({
        isRead: false,
        message,
        type: 'error',
      });
    })
    .finally(() => {
      closeTicketLoading.value = false;
    });
};
const closeConfirm = () => {
  ticketStore.showConfirmModal = false;
};
const handleShowModal = () => {
  ticketStore.showConfirmModal = true;
};
const handleConfirm = () => {
  closeTicket();
};
</script>

<style lang="scss" scoped>
.replies {
  &__root--default {
    @apply w-full border border-border-divider rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
  &__root--second-user {
    @apply w-full bg-surface-soft rounded-l-md rounded-br-md rounded-tr-sm p-lg;
  }
  &__date-section {
    @apply text-body-400-b3 text-text-soft text-center mb-xl break-all;
  }
  &__content {
    @apply mb-md text-body-400-b2 text-text break-all;
  }
  &__footer {
    @apply text-text-soft text-caption-400-c1 text-left;
  }
}
</style>
