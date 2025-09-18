<template>
  <div class="flex flex-col gap-xl items-center">
    <ui-Icon name="CheckMarkCircleFill" class="text-text-success !text-[48px]" />
    <div class="flex flex-col gap-sm text-center max-w-[400px]">
      <p class="text-heading-600-h2">
        {{ $t('_direct_reconcile.terminal_setting.activation_modal.success_message.title') }}
      </p>
      <p class="text-body-400-b2 text-text-soft">
        {{ $t('_direct_reconcile.terminal_setting.activation_modal.success_message.caption') }}
      </p>
    </div>
  </div>
</template>
