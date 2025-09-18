<template>
  <ui-Modal
    close-icon
    header
    :text="t('_terminal.terminal_subdomain_setting.step2.confirm_edit_modal.title')"
    class="lg:max-w-[400px]"
    container-class="!mt-0"
    @close="emit('close')"
  >
    <template #body>
      <div class="space-y-xl">
        <p class="text-body-400-b2">
          {{ t('_terminal.terminal_subdomain_setting.step2.confirm_edit_modal.description1') }}
        </p>
        <p class="text-body-400-b2">
          {{ t('_terminal.terminal_subdomain_setting.step2.confirm_edit_modal.description2') }}
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center gap-xs justify-end w-full">
        <ui-Button
          :text="t('_common.buttons.cancel')"
          type="secondary"
          :disabled="loading"
          @click="emit('close')"
        />
        <ui-Button
          :text="t('_common.buttons.submit_save')"
          :loading="loading"
          :disabled="loading"
          @click="emit('submit')"
        />
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
const t = useI18n();
const emit = defineEmits(['close', 'submit']);
defineProps<{
  loading: boolean;
}>();
</script>
