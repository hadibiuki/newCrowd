<template>
  <div class="root">
    <div class="w-full md:w-1/3 flex md:flex-col flex-row md:items-center">
      <ui-Illustration v-if="!md" name="SupportAvatars" />
      <div class="text-right w-full my-md relative text-body-400-b3">
        <ul class="list-disc text-text-soft space-y-xl list-outside mx-md" dir="rtl">
          <li>{{ $t('_helper.addTicket.part1') }}</li>
          <li>{{ $t('_helper.addTicket.part2') }}</li>
          <li>{{ $t('_helper.addTicket.part3') }}</li>
        </ul>
      </div>
    </div>
    <div class="w-full md:w-2/3">
      <ui-Card>
        <template #main>
          <form @submit.prevent="onSubmit">
            <div class="text-text-soft text-body-400-b2 text-right flex flex-col gap-sm">
              <span>{{ $t('_form.addTicket.description') }}</span>
              <!-- department -->
              <div class="flex flex-col mt-xl w-full justify-between gap-sm">
                <div class="w-full">
                  <ui-Select
                    after-icon="AngleDown"
                    :loading="loading"
                    name="department"
                    :data="data"
                    :placeholder="$t('_form.addTicket.department')"
                    :helper="{
                      type: isDirty && !!errors.department ? 'error' : undefined,
                      message: errors.department,
                    }"
                    @selected-item="handleSelectedDepartment"
                  />
                </div>
              </div>
              <!-- title -->
              <div>
                <ui-TextField
                  :placeholder="$t('_form.addTicket.title')"
                  name="title"
                  :loading="loading"
                  :helper="{
                    type: !!errors.title ? 'error' : undefined,
                    message: errors.title,
                  }"
                />
              </div>
              <!-- description -->
              <div>
                <ui-Textarea
                  :placeholder="$t('_form.addTicket.content')"
                  name="content"
                  :loading="loading"
                  :helper="{
                    type: !!errors.content ? 'error' : undefined,
                    message: errors.content,
                  }"
                />
              </div>
              <div class="md:flex md:mt-xl md:flex-row-reverse md:justify-between">
                <div class="flex justify-end">
                  <ui-Dropzone
                    v-model:uploaded-file="uploadedFile"
                    :description="false"
                    :max-size="20.12e5"
                    :accept="['.png', '.jpg', '.jpeg', '.zip']"
                    :percent="percentUpload"
                    :upload-error="uploadError"
                    :max-files="1"
                    @on-cancel="handleUploadCancel"
                    @on-upload="uploadFile"
                  />
                </div>
                <div class="mt-md md:mt-0">
                  <ui-Button
                    html-type="submit"
                    :text="$t('_common.buttons.sendTicket')"
                    :loading="loading"
                    :disabled="!meta.valid"
                  />
                </div>
              </div>
            </div>
          </form>
        </template>
      </ui-Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketSchema } from '@/composables/ticket/useTicketSchema';
import { createNewTicketApi } from '~/restApi/ticket';

const t = useI18n();
const router = useRouter();
const { $notify } = useNuxtApp();
const { md } = useSize();
const { CategoryTypeList } = useTicketStatus();
const data = CategoryTypeList;
const selectedDepartment = ref({
  id: 0,
  title: '',
});
const loading = ref(false);
const { uploadFile, percentUpload, uploadError, uploadedFile, handleUploadCancel } =
  useUpload(false);
const { schema } = useTicketSchema(selectedDepartment);
const { handleSubmit, errors, meta } = useForm({
  validationSchema: schema,
});
const isDirty = useIsFormDirty();
const handleSelectedDepartment = (value: { id: string; title: string }) => {
  selectedDepartment.value.id = Number(value.id);
  selectedDepartment.value.title = value.title;
};
const onSubmit = handleSubmit(values => {
  const body = {
    category: selectedDepartment.value.id.toString(),
    title: values.title,
    description: values.content,
    // priority: 'MEDIUM',
  };
  const customFile = uploadedFile.value ? uploadedFile.value : undefined;
  loading.value = true;

  // eslint-disable-next-line promise/catch-or-return
  createNewTicketApi(body, customFile)
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res.data) {
        $notify({
          isRead: false,
          message: t('common.success'),
          type: 'success',
        });
        router.push('/panel/ticket');
      }
    })
    .catch((err: Error) => {
      const message = err?.details?.message || t('common.somethingWrong');
      $notify({
        isRead: false,
        message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" scoped>
.root {
  @apply flex flex-col-reverse md:flex-row gap-md font-yekanFa;
}
</style>
