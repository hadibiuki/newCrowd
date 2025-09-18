<template>
  <div class="flex flex-col gap-md">
    <ui-Button
      :text="$t('_common.buttons.navigate_to_dashboard')"
      :loading="loading"
      size="large"
      @click="navigateToDashboard"
    />
  </div>
</template>
<script lang="ts" setup>
interface Props {
  terminalId: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { terminalId } = toRefs(props);
const { isFromApp } = useFromAppRoute();
const { homeUrl } = useRedirectToHome();
const router = useRouter();
const { data: terminals, loading, refetch } = useTerminalQuery();
onMounted(() => {
  refetch();
});
const { setActiveTerminal } = useActiveTerminal();
const navigateToDashboard = () => {
  const terminal = terminals.value?.find(t => t.id === terminalId.value);
  if (isFromApp.value) {
    return (window.location.href = 'zarinpalapp://terminal');
  } else {
    if (!terminal) {
      return router.push(homeUrl.value);
    }
    setActiveTerminal(terminal);

    return router.push(`/panel/${encodeURIComponent(terminal.domain as string)}/dashboard`);
  }
};
</script>
