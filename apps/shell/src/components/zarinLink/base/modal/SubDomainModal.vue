<template>
  <ui-Modal
    close-icon
    :text="$t('_zarin_link.sub_domain.sub_domain_modal.title')"
    class="w-full lg:max-w-[400px]"
    @close="$emit('close')"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center gap-lg">
        <ui-Illustration name="DomainBrowser" />
        <p class="text-text-soft text-body-400-b3">
          {{ $t('_zarin_link.sub_domain.sub_domain_modal.description') }}
        </p>
      </div>
    </template>
    <template #footer>
      <ui-Button block @click="openSubDomainSettings">
        {{ $t('_zarin_link.sub_domain.sub_domain_setting') }}
      </ui-Button>
    </template>
  </ui-Modal>
</template>
<script setup lang="ts">
// settings
const { activeTerminal } = useTerminalQuery();

defineEmits(['close']);
const router = useRouter();
const openSubDomainSettings = () => {
  router.push(
    `/panel/${encodeURIComponent(
      activeTerminal.value?.domain as string
    )}/settings?menu=TechnicalSetting`
  );
};
</script>
