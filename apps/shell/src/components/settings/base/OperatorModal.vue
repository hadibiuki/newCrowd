<template>
  <ui-Modal
    v-if="showTemplateModal"
    :text="modalType === 'phone' ? 'دعوت اپراتور' : 'تایید اطلاعات اپراتور'"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[500px]"
    @close="closeHandler()"
  >
    <template #body>
      <div v-if="modalType === 'phone'">
        <ui-Illustration name="InviteUser" class="mx-auto w-full mb-xl" />
        <p class="text-text-soft text-body-400-b2 text-text-soft mb-xl">
          جهت دعوت اپراتور شماره موبایل ثبتنامی کاربر را وارد کنید.
        </p>
        <ui-TextField
          v-model="phone"
          placeholder="شماره موبایل"
          before-icon="Search"
          class="mb-xl"
        />
      </div>
      <div v-else class="flex flex-col items-center">
        <ui-Avatar
          v-if="user?.avatarFile"
          :src="user?.avatarFile?.url"
          has-border
          size="xl"
          shape="rounded"
        />
        <ui-Avatar
          v-else
          size="xl"
          class-icon="w-md h-md !text-heading-600-h3 flex items-center"
          shape="rounded"
        />
        <ui-Summary class="flex flex-col ltr my-xl" :items="summaryItems" />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-xs w-full">
        <ui-Button type="secondary" text="انصراف" @click="closeHandler()" />
        <ui-Button
          v-if="modalType === 'phone'"
          type="primary"
          text="تایید شماره موبایل"
          :loading="loading"
          :disabled="phone.length !== 11"
          is-number
          @click="checkuserPhone"
        />
        <ui-Button
          v-else
          type="primary"
          text="تایید و دعوت اپراتور"
          :loading="loading"
          :disabled="phone.length !== 11"
          is-number
          @click="inviteUserHandler"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { sendInviteForOperatorApi } from '~/restApi/legals';
import { getSearchUserByPhoneApi } from '~/restApi/user';

defineProps<{
  showTemplateModal: boolean;
}>();
const { $notify } = useNuxtApp();
const emit = defineEmits(['close']);
const phone = ref('');
const loading = ref(false);
const user = ref(null);
const modalType = ref('phone');
const summaryItems = ref([]);
const checkuserPhone = () => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  getSearchUserByPhoneApi(phone.value)
    // eslint-disable-next-line promise/always-return
    .then(res => {
      // eslint-disable-next-line promise/always-return
      const temp =  res?.data?.items?.at(0) 
      user.value = temp;
      modalType.value = 'info';
      summaryItems.value = [
        {
          id: 1,
          value: temp.fullName,
          title: 'نام و نام خانوادگی',
        },
        {
          id: 2,
          value: temp.id,
          title: 'کد کاربری',
        },
        {
          id: 3,
          title:'احراز هویت',
          status:{
            type:getStetus(temp.sejamStatus),
            text:getText(temp.sejamStatus),
          },
        },
      ];
    })
    .catch(err => {
      console.log({ err });
    })
    .finally(() => {
      loading.value = false;
    });
};
const getText = (id: number) => {
  if (id === 0) {
    return 'در حال بررسی';
  }
  if (id === 1) {
    return 'تایید شده';
  }
  if (id === 2) {
    return 'رد شده';
  }
};
const getStetus = (id: number) => {
  if (id === 0) {
    return 'warning';
  }
  if (id === 1) {
    return 'positive';
  }
  if (id === 2) {
    return 'negative';
  }
};
const inviteUserHandler = () => {
  loading.value = true;
  const body = {
    phoneNumber: phone.value,
    legalUserId: user.value?.id.split('.')?.at(1),
  };
  // eslint-disable-next-line promise/catch-or-return
  sendInviteForOperatorApi(body)
    .then((res: object) => {
      // eslint-disable-next-line promise/always-return
      if (res.meta.isSuccess) {
        $notify({
          isRead: false,
          message: 'دعوت نامه برای اپراتور ارسال شد.',
          type: 'success',
        });
        closeHandler();
      }
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'success',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
const closeHandler = () => {
  phone.value = '';
  modalType.value = 'phone';
  emit('close');
};
</script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
  }
}
.rtl {
  direction: rtl;
}

// .main__item--heading {
//   flex: 1 0 2%;
// }
</style>
