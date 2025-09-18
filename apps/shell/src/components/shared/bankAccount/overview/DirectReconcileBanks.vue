<template>
  <div class="p-md flex flex-col gap-md border border-border-divider rounded-sm">
    <p class="text-text text-caption-500-c1">
      {{ $t('_direct_reconcile.terminal_setting.bank_account.title') }}
    </p>
    <p class="text-text-soft text-body-400-b3">
      {{ $t('_direct_reconcile.terminal_setting.bank_account.caption') }}
    </p>
    <div class="flex items-center flex-wrap gap-sm" dir="rtl">
      <div
        v-for="(slug, index) in bankList"
        :key="index"
        class="h-xl w-xl max-h-xl inline-flex justify-center items-center border relative border-border-soft rounded-sm bg-surface-soft p-2xs"
      >
        <ui-BankLogo :name="slug" class="w-full h-full" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { bankList } from '@/consts/directReconcile';
</script>
