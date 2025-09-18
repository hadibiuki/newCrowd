<template>
  <div class="flex flex-col h-full space-y-xl">
    <span class="flex justify-end text-heading-600-h2">
      {{ $t('_common.slug.technical_setting') }}
    </span>

    <SettingsBaseDomain v-if="isShaparakTerminal" />
    <hr v-if="isShaparakTerminal" class="text-border-divider" />
    <SettingsBaseIpServer />
  </div>
</template>

<script setup lang="ts">
const { isShaparakTerminal } = useTerminalQuery();
</script>
