<template>
  <div>
    <SharedLoadingSPALoading v-if="authStore.spaLoading" />
    <div v-else class="root">
      <slot v-if="!isFromApp" name="topbar"></slot>
      <SharedShareModalDownloadApp v-if="!isFromApp" v-model="showDownloadApp" />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const t = useI18n();
const authStore = useAuthStore();
const showDownloadApp = ref(true);
useHead({
  titleTemplate: title =>
    title ? ` ${t('_common.app_name')} | ${title}` : `${t('_common.app_name')}`,
});
const { isFromApp } = useFromAppRoute();
</script>

<style lang="scss">
.root {
  &__start-section {
    @apply flex gap-2xs items-center;
  }
  &__user-menu {
    @apply cursor-pointer hover:bg-surface-hover p-[4px] rounded-sm;
  }
  .terminal-layout {
    @apply flex justify-between;
  }
}
</style>
