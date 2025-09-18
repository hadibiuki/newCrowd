<template>
  <div class="mt-md">
    <form @submit.prevent="onSubmit">
      <ui-Card>
        <template #header>
          <div class="text-right">{{ $t('_form.reply.title') }}</div>
        </template>
        <template #main>
          <div v-if="!isClosed" class="text-body-400-b3 mt-xl">
            <ul class="list-disc text-text-soft mx-md mb-xl flex flex-col gap-xs" dir="rtl">
              <li>{{ $t('_helper.addTicket.part1') }}</li>
              <li>{{ $t('_helper.addTicket.part2') }}</li>
              <li>{{ $t('_helper.addTicket.part3') }}</li>
              <li>{{ $t('_helper.addTicket.part4') }}</li>
            </ul>
            <ui-TextEditor
              v-model="editor"
              name="content"
              :loading="loading"
              :helper="{
                type: !!errors.content ? 'error' : undefined,
                message: errors.content,
              }"
            />
          </div>
          <div v-else class="mt-lg">
            <ui-InlineMessage
              type="neutral"
              :title="$t('_helper.addTicket.closed_title')"
              :description="$t('_helper.addTicket.closed_description')"
            />
          </div>
        </template>
        <template v-if="!isClosed" #footer>
          <div class="flex mt-xl flex-row-reverse justify-between">
            <div class="flex justify-end mt-md md:mt-0">
              <ui-Dropzone
                v-model:uploaded-file="uploadedFile"
                :description="false"
                :accept="['.png', '.jpg', '.jpeg', '.zip']"
                :max-size="20.12e5"
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
                :disabled="!meta?.valid"
              />
            </div>
          </div>
        </template>
      </ui-Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTicketReplySchema } from '@/composables/ticket/useTicketReplySchema';
import { replyTicketApi } from '~/restApi/ticket';
import { TicketStatusEnum } from '~/consts/ticket';

const { $notify } = useNuxtApp();
const t = useI18n();
const router = useRouter();
export interface Response {
  meta: {
    file_id: string;
  };
}
const loading = ref(false);
const ticketStore = useTicketStore();
const { detailsData: data } = storeToRefs(ticketStore);
const editor = ref();
const { htmlToMarkdown } = useTextEditor();
const { uploadFile, percentUpload, uploadError, uploadedFile, handleUploadCancel } =
  useUpload(false);
const route = useRoute();
const { schema } = useTicketReplySchema();
const { handleSubmit, errors, resetForm, meta } = useForm({
  validationSchema: schema,
});
const isClosed = computed(() => data.value && data.value?.status.id === TicketStatusEnum.CLOSED);
const onSubmit = handleSubmit(values => {
  loading.value = true;
  // eslint-disable-next-line promise/catch-or-return
  replyTicketApi(
    route.params.id as string,
    values.content && htmlToMarkdown(editor.value),
    uploadedFile.value || undefined
  )
    .then(res => {
      // eslint-disable-next-line promise/always-return
      if (res) {
        $notify({
          isRead: false,
          message: t('common.success'),
          type: 'success',
        });
        resetForm();
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
