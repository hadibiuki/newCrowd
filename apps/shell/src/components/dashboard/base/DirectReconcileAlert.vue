<template>
  <ui-Skeleton :loading="loading" full-width :height="148" class="my-md">
    <ui-InlineMessage
      v-if="showDirectReconcileAlertBox"
      type="informative"
      :title="t('_direct_reconcile.intro_inline_message.title')"
      :description="t('_direct_reconcile.intro_inline_message.description')"
      toggle
      :action-button-text="t('_direct_reconcile.intro_inline_message.button')"
      @action-button-handler="() => navigateTo(directReconcileLink)"
      @close="closeDirectReconcile"
    />
  </ui-Skeleton>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
const { isCandidateDirectReconcile, hadActiveDirectReconcile, isActiveDirectReconcile } =
  useDirectReconcile();
const { activeTerminal } = useTerminalQuery();
const t = useI18n();
const authStore = useAuthStore();
const directReconcileLink = computed(
  () =>
    `/panel/${encodeURIComponent(
      activeTerminal.value?.domain as string
    )}/settings?menu=DirectReconcile`
);
const showDirectReconcileAlertBox = computed(
  () =>
    activeTerminal.value?.id &&
    isCandidateDirectReconcile.value &&
    !hadActiveDirectReconcile.value &&
    authStore.showDirectReconcile(activeTerminal.value?.id) &&
    !isActiveDirectReconcile.value
);
const closeDirectReconcile = () => {
  if (!activeTerminal.value?.id) {
    return;
  }

  authStore.setDirectReconcile(activeTerminal.value.id);
};
</script>
