<template>
  <SharedLayout>
    <template v-if="!isFromApp" #topbar>
      <ui-Topbar ref="topBarRef" end-classes="overflow-hidden">
        <!-- actions -->
        <template #startSection>
          <LazySharedTopbarTerminalStartSection />
        </template>
        <!-- logo & burger menu -->
        <template #endSection>
          <LazySharedTopbarTerminalEndSection />
        </template>
      </ui-Topbar>
    </template>
    <SharedShareModalDirectReconcile
      v-if="currentModal === ModalType.DirectReconcile"
      :outside-click="false"
      @close="handleCloseDirectReconcileModal"
    />
    <SharedShareModalWelcome v-else-if="currentModal === ModalType.Welcome" @close="handleClose" />
    <SharedShareModalChangeLog
      v-else-if="currentModal === ModalType.ChangeLog"
      :data="data"
      @close="handleCloseLog"
    />
    <LazySharedLayoutLogOut />
    <div class="terminal-layout flex-row-reverse">
      <LazySharedNavbarMainMenu v-if="!isFromApp" />
      <slot />
    </div>
  </SharedLayout>
</template>
<script setup lang="ts">
const t = useI18n();
const authStore = useAuthStore();
const route = useRoute();
const topBarRef = ref();
const showChangeLog = ref(false);
const hasSeenWelcome = ref(false);
const closedDirectReconcile = ref(false);

enum ModalType {
  DirectReconcile,
  Welcome,
  ChangeLog,
}
const { data, onResult } = useReleaseNoteQuery();
const { isFromApp } = useFromAppRoute();
onResult(() => {
  if (data.value?.version) {
    if (authStore.version !== data.value.version) {
      showChangeLog.value = true;
    }
  }
});
const handleCloseLog = () => {
  if (data.value) {
    authStore.version = data.value.version as string;
  }
  showChangeLog.value = false;
};
useHead({
  titleTemplate: title =>
    title ? ` ${t('_common.app_name')} | ${title}` : `${t('_common.app_name')}`,
});
const store = useTerminalStore();
store.logoVersion = new Date().getTime();
const handleClose = () => {
  authStore.isFirstTime = false;
  hasSeenWelcome.value = true;
};
const handleCloseDirectReconcileModal = () => {
  authStore.setDirectReconcileModal(false);
  closedDirectReconcile.value = true;
};
const currentModal = computed<ModalType | undefined>(() => {
  if (authStore.directReconcileModal && !closedDirectReconcile.value) {
    return ModalType.DirectReconcile;
  }
  if (route.name === 'dashboard' && !closedDirectReconcile.value) {
    if (authStore.isFirstTime) {
      return ModalType.Welcome;
    }
    if (showChangeLog.value && !authStore.tourActive && !hasSeenWelcome.value) {
      return ModalType.ChangeLog;
    }
  }

  return undefined;
});
tour?.on('inactive', () => {
  authStore.tourActive = false;
});
provide('topBarRef', topBarRef);
</script>

<style lang="scss">
.shepherd-element {
  z-index: 10000010;
}
.shepherd-modal-overlay-container {
  z-index: 10000000;
}
.rtl-tour {
  direction: rtl !important;
}
.shepherd-title {
  color: #ffff;
  @apply text-heading-600-h1;
}
.shepherd-cancel-icon {
  color: #ffff !important;
}
.shepherd-arrow::before {
  background-color: #0a33ff !important;
}
.shepherd-header {
  background-color: #0a33ff !important;
  color: #ffff;
  @apply border-0;
}
.shepherd-text {
  @apply text-body-400-b2 text-text-onPrimary;
}
</style>
