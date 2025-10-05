<template>
  <div class="pb-3xl w-full container-lg">
    <SettingsBaseHeader />
    <SettingsBaseMain class="px-md lg:px-0" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'settings',
  layoutTransition: false,
  layout: 'terminal',
});
const t = useI18n();
useHead({
  title: t('_common.page_title.setting'),
});
</script>
