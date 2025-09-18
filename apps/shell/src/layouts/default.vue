<template>
  <SharedLayout>
    <template #topbar>
      <ui-Topbar ref="topBarRef" class="sticky">
        <template #startSection>
          <LazySharedTopbarTerminalStartSection />
        </template>
        <template #endSection>
          <NuxtLink :to="homeUrl">
            <ui-Logo name="zarinpalFaLight" class="cursor-pointer" />
          </NuxtLink>
        </template>
      </ui-Topbar>
    </template>
    <LazySharedLayoutLogOut />
    <slot />
  </SharedLayout>
</template>
<script setup lang="ts">
const t = useI18n();
const { homeUrl } = useRedirectToHome();
const topBarRef = ref();
useHead({
  titleTemplate: title =>
    title ? ` ${t('_common.app_name')} | ${title}` : `${t('_common.app_name')}`,
});
provide('topBarRef', topBarRef);
</script>
