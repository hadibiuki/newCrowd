<template>
  <ui-Skeleton :loading="loading" full-width :height="148" class="my-md">
    <ui-InlineMessage
      type="warning"
      :title="t('_terminal.fee_alert.title')"
      :action-button-text="displayActionButton ? t('_terminal.fee_alert.action_button') : null"
      @action-button-handler="actionButtonHandler"
    >
      <template #description>
        <div class="inline-msg-des">
          {{ t('_terminal.fee_alert.description') }}

          <span class="text-primary cursor-pointer" @click="openWordpressLink">
            {{ t('_terminal.fee_alert.wordpress') }}
          </span>
          {{ t('_terminal.fee_alert.or') }}
          <span class="text-primary cursor-pointer" @click="openSpecialSoftwareLink">
            {{ t('_terminal.fee_alert.special_software') }}
          </span>
          {{ t('_terminal.fee_alert.description_2') }}
        </div>
      </template>
    </ui-InlineMessage>
  </ui-Skeleton>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loading: boolean;
    displayActionButton: boolean;
  }>(),
  {
    displayActionButton: true,
  }
);

const router = useRouter();
const { activeTerminal } = useTerminalQuery();
const t = useI18n();
const actionButtonHandler = () => {
  router.push(
    `/panel/${encodeURIComponent(activeTerminal.value?.domain as string)}/settings?menu=Fee`
  );
};
const openWordpressLink = () => {
  const wordpressLink = 'https://www.zarinpal.com/docs/extensions/official-Woocommerce.html';
  window.open(wordpressLink, '_blank');
};
const openSpecialSoftwareLink = () => {
  const specialSoftwareLink = 'https://www.zarinpal.com/docs/sdkDocs/';
  window.open(specialSoftwareLink, '_blank');
};
</script>
