<template>
  <NuxtLayout>
    <NuxtPage />
    <Teleport to="body">
      <LazySharedToast
        v-for="(item, index) in notificationStore.unreads"
        :key="item.id"
        :data="item"
        :index="index"
      />
    </Teleport>
  </NuxtLayout>
</template>
<script lang="ts" setup>
const t = useI18n();
useHead({
  titleTemplate: title =>
    title ? ` ${t('_common.app_name')} | ${title}` : `${t('_common.app_name')}`,
});
const notificationStore = useNotificationStore();
</script>
