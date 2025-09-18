<template>
  <ui-Modal
    v-if="authStore.showLogOut"
    :text="$t('notif_settings.logoutModal.title')"
    close-icon
    header
    width="480px"
    @close="toggleModal"
  >
    <template #body>
      <div class="p-md text-body-400-b2 text-text">
        {{ $t('notif_settings.logoutModal.text') }}
      </div>
    </template>
    <template #leftFooter>
      <div class="flex gap-xs">
        <ui-Button
          type="secondary"
          size="medium"
          :disabled="authStore.spaLoading"
          :text="$t('common.cancel')"
          @click="toggleModal"
        />
        <ui-Button
          :loading="authStore.spaLoading"
          :disabled="authStore.spaLoading"
          type="decretive"
          size="medium"
          :text="$t('common.yes')"
          @click="logOut"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
const { nextLogout } = useNextLogout();
const authStore = useAuthStore();
const logOut = async () => {
  await nextLogout();
};
const toggleModal = () => {
  authStore.showLogOut = !authStore.showLogOut;
};
</script>
