<template>
  <div class="space-y-md" dir="rtl">
    <div class="space-y-xs">
      <p class="text-body-500-b2">
        {{ t('_terminal.terminal_subdomain_setting.step1.title') }}
      </p>
      <p class="text-body-400-b3 text-text-soft">
        {{ t('_terminal.terminal_subdomain_setting.step1.description1') }}
      </p>
    </div>
    <div v-if="currentActiveCname?.status" class="flex items-center gap-xs">
      <p class="text-body-500-b3 text-text-soft flex items-center gap-2xs">
        {{ t('_terminal.terminal_subdomain_setting.step2.current_domain') }}
        <ui-Icon name="InfoFill" class="flex items-center text-text-soft" style="font-size: 16px" />
      </p>
      <p class="text-body-500-b3 text-text-soft">{{ currentDomain }}</p>
      <ui-Status
        :text="$t('_terminal.terminal_subdomain_setting.data_sheet.status.connected')"
        type="positive"
      />
    </div>
    <SettingsBaseDomainCommonDataSheet
      :domain="domain"
      :status="currentCname?.status ? 'connected' : 'pending'"
      :has-retry="!currentCname?.status"
      :has-edit="true"
      :retry-loading="loading"
      @retry="retry"
      @edit="emit('edit', true)"
    />
    <div v-if="!currentCname?.status" class="space-y-md">
      <p class="text-body-400-b3 text-text-soft">
        {{ t('_terminal.terminal_subdomain_setting.step2.cname_description') }}
      </p>
      <p
        v-if="!loading"
        class="text-primary cursor-pointer text-body-400-b3"
        @click="openSubDomainSettingsLink"
      >
        {{ t('_zarin_link.sub_domain.sub_domain_danger_alert.link') }}
      </p>
      <div class="space-y-sm">
        <p class="text-body-500-b3 text-text-soft">
          {{ t('_terminal.terminal_subdomain_setting.step2.cname') }}
        </p>

        <ui-ClipBoard :content="CNAME" />
      </div>
      <p class="text-body-400-b3 text-text-soft">
        {{ t('_terminal.terminal_subdomain_setting.step2.cname_descriptionTwo') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const t = useI18n();
const { $notify } = useNuxtApp();
const emit = defineEmits(['edit']);
const CNAME = 'zpc.zarinpal.com';
const { checkCname } = useTerminalMutation();
const { refetch: refetchTerminalMenu, loading: isRefetchingTerminalMenu } = useTerminalMenuQuery();
const {
  loading: isCheckingCname,
  mutate: checkCnameMutation,
  onDone: onDoneCheckCname,
} = checkCname();
const loading = computed(() => isRefetchingTerminalMenu.value || isCheckingCname.value);
const { currentCname, activeTerminal, currentActiveCname } = useTerminalQuery();
const currentDomain = computed(
  () => `${currentActiveCname.value?.sub_domain}.${activeTerminal.value?.domain}`
);
const domain = computed(() => `${currentCname.value?.sub_domain}.${activeTerminal.value?.domain}`);
const throttle = useThrottleSessionStorage(
  activeTerminal?.value?.domain + 'retry-cname',
  5,
  '1 hour'
);
const retry = () => {
  if (!throttle.canProceed.value) {
    $notify({
      isRead: false,
      message: t('_terminal.terminal_subdomain_setting.retry_throttled'),
      type: 'error',
    });

    return;
  }
  throttle.registerAttempt();
  checkCnameMutation({
    terminal_id: activeTerminal.value?.id ? +activeTerminal.value?.id : 0,
    sub_domain: currentCname.value?.sub_domain,
  });
};
onDoneCheckCname(async () => {
  await refetchTerminalMenu();
  $notify({
    isRead: false,
    message: t('_terminal.terminal_subdomain_setting.success_edit_cname'),
    type: 'success',
  });
});
const openSubDomainSettingsLink = () => {
  const subDomainSettingsLink =
    'https://www.zarinpal.com/blog/%D8%AA%D9%86%D8%B8%DB%8C%D9%85-%D8%B2%DB%8C%D8%B1-%D8%AF%D8%A7%D9%85%D9%86%D9%87-%D8%A7%D8%AE%D8%AA%D8%B5%D8%A7%D8%B5%DB%8C-%D8%AF%D8%B1-%D8%B2%D8%B1%DB%8C%D9%86%D9%BE%D8%A7%D9%84/';
  window.open(subDomainSettingsLink, '_blank');
};
</script>
