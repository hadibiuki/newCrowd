<template>
  <div>
    <ui-PageHeading :title="$t('_common.links.dashboard')" :loading="loading"> </ui-PageHeading>
    <DashboardBaseInviteModal
      v-if="invities"
      :loading="loadingInvite"
      :show-template-modal="showInviteModal"
      :data="invities"
      @close="showInviteModal = false"
      @reject="acceptInviteHandler(false)"
      @accept="acceptInviteHandler(true)"
    />
  </div>
</template>

<script setup lang="ts">
import { AcceptInvitationsOperatorsApi, getAllInvitationApi } from '~/restApi/legals';

export interface Props {
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const { loading } = toRefs(props);
const loadingInvite = ref(false);
const invities = ref(null);
const showInviteModal = ref(true);
const { $notify } = useNuxtApp();
onMounted(() => {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getAllInvitationApi().then(res => {
    console.log({res})
    if (res.data?.at(0)) invities.value = res.data[0];
  });
});

const acceptInviteHandler = (accept: boolean) => {
  loadingInvite.value = true;
  // eslint-disable-next-line promise/catch-or-return
  AcceptInvitationsOperatorsApi(invities.value?.inviteationToken, accept)
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
        showInviteModal.value = false;
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
