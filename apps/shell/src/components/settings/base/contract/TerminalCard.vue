<template>
  <div class="mt-lg border border-border-divider rounded-sm">
    <ui-Skeleton v-if="isLoading" full-width :height="108" />
    <ui-NavLink
      v-else
      icon="Document"
      class="!p-md"
      :label="title"
      :sub-text="t('_terminal.contract_alert.version', { version })"
      :is-vertical-label="true"
      @click="$emit('showContractTextModal')"
    >
      <template #meta>
        <ui-Status
          v-if="!isSigned"
          type="warning"
          :text="t('_terminal.contract_alert.not_signed')"
        />
      </template>
    </ui-NavLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSigned: boolean;
  title: string;
  version: string;
  isLoading: boolean;
}>();
defineEmits(['showContractTextModal']);
const t = useI18n();
</script>

<style scoped lang="scss"></style>
