<template>
  <div class="pb-3xl w-full container-lg px-md lg:px-0">
    <div class="flex flex-col items-center justify-center mt-3xl">
      <div class="flex flex-col items-center">
        <ui-Illustration name="InviteUser" class="mx-auto w-full mb-xl" />
        <p class="text-text text-heading-600-h2 mb-xl">دعوت به حساب حقوقی</p>
        <p class="text-text-soft text-body-400-b2 mb-xl">
          <strong>{{ inviteData.companyName }}</strong> از شما دعوت کرد تا به عنوان اپراتور این حساب حقوقی نیز فعالیت کنید
        </p>
      </div>
      <div class="flex items-center justify-center gap-xs w-full">
        <ui-Button
          type="secondary"
          size="medium"
          text="رد کردن"
          :disabled="loadingInvite"
          :loading="loadingInvite"
          @click="acceptInviteHandler(false)"
        />
        <ui-Button
          :disabled="loadingInvite"
          :loading="loadingInvite"
          size="medium"
          text="پذیرفتن دعوت"
          class="w-[320px]"
          @click="acceptInviteHandler(true)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AcceptInvitationsOperatorsApi, InvitationsOperatorsApi } from '~/restApi/legals';
definePageMeta({
  name: 'invite',
  layout: 'signup',
});
const { $notify } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const inviteData = ref({});
onMounted(() => {
  // eslint-disable-next-line promise/catch-or-return
  InvitationsOperatorsApi(route.params.id).then(res => {
    // eslint-disable-next-line promise/always-return
    if (res) {
      inviteData.value = res.data;
    }
  });
});

const loadingInvite = ref(false);
const acceptInviteHandler = (accept: boolean) => {
  loadingInvite.value = true;
  // eslint-disable-next-line promise/catch-or-return
  AcceptInvitationsOperatorsApi(route.params.id, accept)
    // eslint-disable-next-line promise/always-return
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res.meta.isSuccess) {
        if (accept) {
          $notify({
            isRead: false,
            message: 'دعوت توسط شما مورد قبول واقع شد.',
            type: 'success',
          });
        } else {
          $notify({
            isRead: false,
            message: 'دعوت توسط شما رد شد.',
            type: 'success',
          });
        }
        router.push('/');
      }
    })
    .catch(err => {
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loadingInvite.value = false;
    });
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
