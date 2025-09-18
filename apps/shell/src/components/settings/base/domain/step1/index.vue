<template>
  <div class="space-y-xl" dir="rtl">
    <div class="flex items-center space-x-reverse">
      <div class="space-y-md">
        <div class="space-y-xs">
          <ui-Skeleton v-if="loading" :width="100" />
          <p v-else class="text-body-500-b2">
            {{ t('_terminal.terminal_subdomain_setting.step1.title') }}
          </p>
          <ui-Skeleton v-if="loading" :width="300" />
          <p v-else class="text-body-400-b3 text-text-soft">
            {{ t('_terminal.terminal_subdomain_setting.step1.description1') }}
          </p>
        </div>

        <div class="space-y-sm w-full">
          <ui-TextField
            v-model="domain"
            :placeholder="domainPlaceholder"
            :unit="domainPrefix"
            :label="false"
            :is-ltr="true"
            :disabled="loading"
            class="w-full"
            name="subdomain"
            :helper="{
              type: !!errors?.subdomain ? 'error' : undefined,
              message: errors?.subdomain,
            }"
          />
          <ui-Skeleton v-if="loading" :width="490" />
          <p v-else class="text-body-400-b3 text-text-soft">
            {{ t('_terminal.terminal_subdomain_setting.step1.description2') }}
          </p>
          <p
            v-if="!loading"
            class="text-primary cursor-pointer text-body-400-b3"
            @click="openSubDomainSettingsLink"
          >
            {{ t('_zarin_link.sub_domain.sub_domain_danger_alert.link') }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex gap-xs justify-end">
      <ui-Button
        v-if="showCancel"
        :disabled="submitLoading || loading"
        :text="$t('_common.buttons.cancel')"
        type="secondary"
        @click="resetFormHandler"
      />
      <ui-Button
        :text="t('_common.buttons.save')"
        :disabled="isSubmitDisabled"
        :loading="submitLoading"
        @click="onSubmitFormHandler"
      />
    </div>
  </div>
  <SettingsBaseDomainCommonConfirmEditModal
    v-if="showConfirmEditModal"
    :loading="submitLoading || loading"
    @close="onCloseConfirmEditModal"
    @submit="onSendData"
  />
</template>

<script setup lang="ts">
const t = useI18n();
const { $notify } = useNuxtApp();
const emit = defineEmits(['edit']);
const showConfirmEditModal = ref(false);
const { activeTerminal, currentCname } = useTerminalQuery();
const { refetch: refetchTerminalMenu, loading: isRefetchingTerminalMenu } = useTerminalMenuQuery();
const { addCname, editCname } = useTerminalMutation();
const { loading: isAddingCname, mutate: addCnameMutation, onDone: onDoneAddCname } = addCname();
const { loading: isEditingCname, mutate: editCnameMutation, onDone: onDoneEditCname } = editCname();
const loading = computed(() => isRefetchingTerminalMenu.value);
const submitLoading = computed(() => isAddingCname.value || isEditingCname.value);
const { schema } = useSubdomainSchema();
const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: schema,
});
const domain = ref('');
const initialDomain = ref('');
const domainPlaceholder = t('_terminal.terminal_subdomain_setting.step1.domain_placeholder');
const domainPrefix = computed(() => `.${activeTerminal.value?.domain || ''}`);
const showCancel = computed(() => domain.value !== '');
const isSubmitDisabled = computed(() => {
  if (currentCname.value) {
    return !meta.value.valid || domain.value === initialDomain.value || loading.value;
  }

  return !meta.value.valid || loading.value;
});
const onSubmitFormHandler = () => {
  if (currentCname.value) {
    showConfirmEditModal.value = true;
  } else {
    onSendData();
  }
};
const onSendData = handleSubmit(() => {
  if (currentCname.value) {
    editCnameMutation({
      terminal_id: activeTerminal.value?.id ? +activeTerminal.value?.id : 0,
      sub_domain: domain.value,
    });
  } else {
    addCnameMutation({
      terminal_id: activeTerminal.value?.id ? +activeTerminal.value?.id : 0,
      sub_domain: domain.value,
    });
  }
});
watchEffect(() => {
  if (currentCname.value) {
    domain.value = currentCname.value.sub_domain || '';
    initialDomain.value = currentCname.value.sub_domain || '';
  } else {
    domain.value = '';
    initialDomain.value = '';
  }
});
const resetFormHandler = () => {
  resetForm();
  domain.value = '';
  if (currentCname.value) {
    emit('edit', false);
  }
};
const onCloseConfirmEditModal = () => {
  showConfirmEditModal.value = false;
  resetFormHandler();
};
onDoneAddCname(async () => {
  await refetchTerminalMenu();
  $notify({
    isRead: false,
    message: t('_terminal.terminal_subdomain_setting.success_create_cname'),
    type: 'success',
  });
});
onDoneEditCname(async () => {
  await refetchTerminalMenu();
  emit('edit', false);
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
