<template>
  <SharedLayout>
    <template #topbar>
      <ui-Topbar class="sticky">
        <template #startSection>
          <ui-Button
            name="Close"
            type="tertiary"
            icon="Close"
            class="!p-0"
            @click="$router.push(homeUrl)"
          />
        </template>
        <template #centerSection>
          <NuxtLink :to="homeUrl" class="mr-xl">
            <ui-Logo name="zarinpalFaLight" class="cursor-pointer" />
          </NuxtLink>
        </template>
      </ui-Topbar>
    </template>
    <slot />
  </SharedLayout>
</template>
<script setup lang="ts">
onMounted(() => {
  document.body.classList.add('!bg-surface');
});
onBeforeUnmount(() => {
  document.body.classList.remove('!bg-surface');
});
const { homeUrl } = useRedirectToHome();
</script>
