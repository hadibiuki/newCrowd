<template>
  <ui-Skeleton :loading="loading" full-width :height="148" class="my-md">
    <ui-InlineMessage
      type="negative"
      :title="t('_zarin_link.sub_domain.sub_domain_danger_alert_callback.title')"
      :action-button-text="t('_zarin_link.sub_domain.sub_domain_setting_active_again')"
      @action-button-handler="() => openSubDomainSettings()"
    >
      <template #description>
        <div class="inline-msg-des">
          {{ t('_zarin_link.sub_domain.sub_domain_danger_alert_callback.description') }}

          <p class="text-primary cursor-pointer" @click="openSubDomainSettingsLink">
            {{ t('_zarin_link.sub_domain.sub_domain_danger_alert_callback.link') }}
          </p>
        </div>
      </template>
    </ui-InlineMessage>
  </ui-Skeleton>
</template>
<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
const router = useRouter();
const { activeTerminal } = useTerminalQuery();
const t = useI18n();
const openSubDomainSettings = () => {
  router.push(
    `/panel/${encodeURIComponent(
      activeTerminal.value?.domain as string
    )}/settings?menu=TechnicalSetting`
  );
};
const openSubDomainSettingsLink = () => {
  const subDomainSettingsLink =
    'https://www.zarinpal.com/blog/%D8%A7%D9%84%D8%B2%D8%A7%D9%85-%D8%AA%D8%B7%D8%A7%D8%A8%D9%82-%D8%AF%D8%A7%D9%85%D9%86%D9%87-%D8%AF%D8%B1-%D9%81%D8%B1%D8%A2%DB%8C%D9%86%D8%AF-%D9%BE%D8%B1%D8%AF%D8%A7%D8%AE%D8%AA/';
  window.open(subDomainSettingsLink, '_blank');
};
</script>
