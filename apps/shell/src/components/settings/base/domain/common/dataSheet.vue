<template>
  <div
    class="mt-xl divide-y divide-border-divider border border-border-divider rounded-sm"
    dir="rtl"
  >
    <div class="p-md flex justify-end flex-col md:flex-row w-full">
      <div class="md:w-1/2 md:min-w-[50%] text-text-soft text-body-400-b3 w-full">
        {{ $t('_terminal.terminal_subdomain_setting.data_sheet.domain') }}
      </div>
      <div class="md:w-1/2 flex items-center justify-between gap-xs w-full">
        <div class="truncate text-body-400-b2" dir="ltr">{{ domain }}</div>
        <ui-Button
          v-if="hasEdit"
          :text="$t('_terminal.terminal_subdomain_setting.data_sheet.edit')"
          variant="text"
          @click="emit('edit')"
        />
      </div>
    </div>
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="md:w-1/2 text-text-soft text-body-400-b3 w-full w-full">
        {{ $t('_terminal.terminal_subdomain_setting.data_sheet.status.title') }}
      </div>
      <div class="md:w-1/2 flex items-center justify-between gap-xs">
        <ui-Status
          v-if="status === 'pending'"
          :text="$t('_terminal.terminal_subdomain_setting.data_sheet.status.pending')"
          type="warning"
        />
        <ui-Status
          v-else
          :text="$t('_terminal.terminal_subdomain_setting.data_sheet.status.connected')"
          type="positive"
        />
        <ui-Button
          v-if="hasRetry"
          :text="$t('_terminal.terminal_subdomain_setting.data_sheet.retry')"
          variant="text"
          :disabled="retryLoading"
          :loading="retryLoading"
          before-icon="Reload"
          @click="emit('retry')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  domain: string;
  status: 'pending' | 'connected';
  hasRetry: boolean;
  hasEdit: boolean;
  retryLoading: boolean;
}>();
const emit = defineEmits(['retry', 'edit']);
</script>
