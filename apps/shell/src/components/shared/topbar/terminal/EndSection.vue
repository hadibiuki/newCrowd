<template>
  <NuxtLink v-if="store.logoState === Status.VISIBLE" :to="homeUrl">
    <ui-Logo name="zarinpalFaLight" class="cursor-pointer" />
  </NuxtLink>

  <ui-Button
    id="product_tour_menu"
    type="tertiary"
    icon="MenuBurger"
    class="w-[40px] h-[40px] !p-0 sm:ml-xs"
    @click.stop="store.toggleNavigator()"
  />
  <ui-Modal
    v-if="toggleModal && store.terminalSelectionState === Status.VISIBLE"
    class="terminal-modal"
    @close="closeOverview"
  >
    <template #body>
      <SharedTerminalOverview @close="closeOverview" />
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
const toggleModal = ref(false);
const store = useNavigateStore();
const closeOverview = () => {
  toggleModal.value = false;
};
const { homeUrl } = useRedirectToHome();
</script>
<style lang="scss" scoped>
:deep(.terminal-modal) {
  .modal__header {
    @apply p-0 basis-0;
  }
  .modal__body__slot {
    @apply p-0;
  }
}

:deep(.root__content) {
  @apply truncate;
}
:deep(.root__content__text > span) {
  @apply truncate;
}
</style>
