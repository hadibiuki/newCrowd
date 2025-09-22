<template>
  <Ui-Card class="user-card shadow-elevation-100">
    <template #header>
      <div class="flex flex-col items-end">
        <div class="flex justify-between items-center w-full p-xs cursor-auto">
          <ui-ZpBadge :id="userAuth?.id" class="h-fit" />
          <ui-Avatar v-if="userAvatar" :src="userAvatar" has-border size="md" shape="rounded" />
          <ui-Avatar
            v-else
            size="md"
            class-icon="w-md h-md !text-heading-600-h3 flex items-center"
            shape="rounded"
          />
        </div>
        <NuxtLink class="w-full" to="/panel/user">
          <ui-Nav-Link
            class="my-sm"
            :label="userAuth?.fullName"
            :loading="loading"
            :sub-text="$t('notif_settings.bank_accounts_addresses_notifications')"
          />
        </NuxtLink>
        <ui-Divider class="w-full" />
      </div>
    </template>
    <template #main>
      <div class="my-sm">
        <ui-Nav-Link class="hidden" :label="$t('common.tour_guide')" :arrow="false" icon="Info" />
        <ui-Nav-Link
          :label="$t('notif_settings.exit')"
          :arrow="false"
          icon="ExitLogout"
          @click="toggleModal"
        />
      </div>
      <div v-if="version" class="p-xs flex justify-center">
        <span class="text-text-soft text-body-400-b3">
          {{ `${$t('_common.modal.version')}: ${version}` }}
        </span>
      </div>
    </template>
  </Ui-Card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const { showLogOut, userAuth, version } = storeToRefs(authStore);
const userAvatar = ref('');
const toggleModal = () => {
  // eslint-disable-next-line no-const-assign
  showLogOut = !showLogOut;
};
const navigationStore = useNavigateStore();
const { windowSize } = useSize();
const checkImage = () => {
  const img = new Image();
  img.src = `${userAuth.value?.avatarFile?.url}`;
  img.onload = () => {
    userAvatar.value = userAuth.value?.avatarFile?.url as string;
  };
  img.onerror = () => {
    userAvatar.value = '';
  };
};
onMounted(() => {
  checkImage();
});
watch(windowSize, () => {
  navigationStore.setNavigatorState();
});
</script>
<style lang="scss" scoped>
.user-card {
  @apply w-[280px];
}

.referral-item {
  i {
    @apply rotate-[270deg];
  }
}
</style>
