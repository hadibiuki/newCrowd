<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-row justify-between item-center">
      <ui-Button text="دعوت اپراتور" type="light" before-icon="Plus" @click="showModal = true" />
      <span class="flex justify-end text-heading-600-h2 text-text"> اپراتورها </span>
    </div>
    <div class="flex flex-col md:flex-row my-xl gap-xl">
      <ui-Table
        v-if="operators.length"
        :columns="columns"
        :is-pointer="false"
        :loading="loading"
        :items="operators"
        class="w-full"
        @hover-row="eventHandler"
      >
        <!--  -->
        <template #item-code="{ avatarFile, fullName, isMainOwner }">
          <div class="h-fit flex">
            <ui-Avatar
              v-if="avatarFile"
              :src="avatarFile?.url"
              has-border
              size="md"
              shape="rounded"
            />
            <ui-Avatar
              v-else
              size="md"
              class-icon="w-md h-md !text-heading-600-h3 flex items-center"
              shape="rounded"
            />
            <div class="flex flex-col mr-sm" dir="rtl">
              <span class="text-body-400-b2 text-text">{{ fullName }}</span>
              <span class="text-body-400-b3 text-text-soft">{{
                isMainOwner ? 'مالک' : 'اپراتور'
              }}</span>
            </div>
          </div>
        </template>
        <template #item-action="{ id, isMainOwner }">
          <div class="flex justify-end">
            <ui-Action
              :id="id"
              v-model:eventType="eventType"
              :selected-id="idValue"
              :limit="2"
              :items="actionHandle(id, isMainOwner, callbackAction)"
              dir="rtl"
              @id-value="idValueHandler"
            />
          </div>
        </template>
      </ui-Table>
    </div>
  </div>

  <SettingsBaseOperatorModal
    :show-template-modal="showModal"
    @close="showModal = false"
    @cancel="showModal = false"
  />
  <SharedShareModalConfirm
    v-if="showConfirm"
    submit-label="_common.buttons.continue"
    cancel-label="_common.buttons.cancel_event"
    description="آیا از حذف این اپراتور مطمن هستید؟"
    :loading="loading"
    @close="showConfirm = false"
    @confirm="handleConfirm"
    @cancel="showConfirm = false"
  />
</template>
<script setup lang="ts">
import { deletOperatorApi, getOperatorListsApi } from '~/restApi/legals';

const columns = ref([
  {
    id: 1,
    label: 'لیست اپراتور‌ها',
    name: 'code',
    width: 'minmax(210px,1fr)',
  },
  {
    id: 5,
    label: '',
    name: 'action',
    width: '80px',
  },
]);
const loading = ref(false);
const showModal = ref(false);
const { $notify } = useNuxtApp();
// const t = useI18n();
const idValue = ref();
const eventType = ref();
const idValueHandler = (value: string) => {
  idValue.value = value;
};
const { actionHandle } = useOperatorAction();
onMounted(() => {
  fetch();
});
const operators = ref([]);
const fetch = async () => {
  try {
    const res = await getOperatorListsApi();
    operators.value = res.data.items;
  } catch (err) {
    $notify({
      isRead: false,
      message: err.message,
      type: 'error',
    });
  }
};
const eventHandler = (event: MouseEvent, item: object) => {
  eventType.value = { event: event.type, uniqueId: item.id };
};
let idSelected = '';
const showConfirm = ref(false);
const callbackAction = (id: string) => {
  idSelected = id.split('.')?.at(1);
  showConfirm.value = true;
};
const handleConfirm = () => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  deletOperatorApi(idSelected)
    // eslint-disable-next-line promise/always-return
    .then(() => {
      showConfirm.value = false;
      fetch();
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<style lang="scss">
input#phoneNumber {
  direction: ltr;
  @apply text-right;
}
</style>
