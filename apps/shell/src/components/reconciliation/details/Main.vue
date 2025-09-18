<template>
  <div>
    <div class="flex flex-col gap-sm mt-0">
      <ui-InlineMessage
        v-if="hasShaparakRejected"
        class="!w-full"
        type="negative"
        :title="$t('_helper.settings.reject_shaparak')"
      >
        <template #description>
          <div class="error-message">
            <span>
              {{ $t('_helper.settings.reject_reconcile_description') }}
            </span>
            <span>
              {{ $t('_helper.settings.rejected_text_1') }}
              <span class="text-primary cursor-pointer" @click="handleNavigateBankAccount">{{
                $t('payout.instant.bank_account')
              }}</span>
              {{ $t('_helper.settings.rejected_text_2') }}
            </span>
          </div>
        </template>
      </ui-InlineMessage>
      <div class="main" dir="rtl">
        <div class="basis-full">
          <ui-Card>
            <template #header>
              <ui-Skeleton :loading="loading" :width="140" :height="20">
                <span class="text-heading-600-h2">
                  {{ $t('_common.page_title.reconciliation_details') }}
                </span>
              </ui-Skeleton>
            </template>
            <template #main>
              <div class="grid grid-cols-6 border border-border-divider rounded-sm mt-xl">
                <div
                  v-for="(item, index) in detailList"
                  :key="item.title"
                  :class="detailStyle(index)"
                  class="main__item--detail"
                >
                  <ui-Skeleton v-if="loading" :width="64" />
                  <div v-else class="text-body-400-b3 text-text-soft">
                    {{ item.title }}
                  </div>
                  <ui-Skeleton v-if="loading" :width="120" />
                  <div v-else class="text-body-400-b2">
                    {{
                      (data && typeof item.value === 'function'
                        ? item.value(data)
                        : data && data[item.value as keyof ReconciliationType]) ?? '-'
                    }}
                  </div>
                </div>
              </div>
            </template>
          </ui-Card>
          <ui-Card class="mt-md">
            <template #header>
              <div class="flex justify-between">
                <ui-Skeleton :loading="loading" :width="140" :height="20">
                  <span class="text-heading-600-h2">
                    {{ $t('_common.slug.sessionPaid') }}
                  </span>
                </ui-Skeleton>
                <div class="w-fit">
                  <ui-Button
                    type="tertiary"
                    variant="outlined"
                    :text="!md ? $t('_common.export.excel') : ''"
                    :before-icon="!md ? 'ArrowTopLeft' : ''"
                    :icon="md ? 'ArrowTopLeft' : ''"
                    :loading="loadingExcel || loading"
                    @click="exportExcel"
                  />
                </div>
              </div>
            </template>
            <template #main>
              <ReconciliationDetailsLgGrid
                v-if="!md"
                class="mt-xl"
                :loading="loading"
                :data="tableData"
              />
              <ReconciliationDetailsMdGrid
                v-else
                class="mt-xl"
                :loading="loading"
                :data="tableData"
              />
              <div v-if="showAllSessions" class="w-full mt-xl">
                <ui-Button
                  type="tertiary"
                  :block="true"
                  variant="outlined"
                  :text="$t('_common.buttons.showAll') + ' (' + showAllSessionsButtonNumber + ')'"
                  :loading="loading"
                  @click="seeAllSessions"
                />
              </div>
            </template>
          </ui-Card>
        </div>
        <div class="lg:w-[368px]">
          <ui-Card class="lg:w-[368px]">
            <template #header>
              <ui-Skeleton :loading="loading" :width="140" :height="20">
                <span class="text-heading-600-h2">
                  {{ $t('_common.slug.reconcileAccounts') }}
                </span>
              </ui-Skeleton>
            </template>
            <template #main>
              <ReconciliationWagesMdGrid :data="wages" :loading="wageLoading && terminalLoading" />
              <ui-Button
                v-if="wagePagination?.total > RECONCILIATION_WAGES_PAGE_SIZE"
                class="mt-xl"
                type="tertiary"
                block
                variant="outlined"
                :text="$t('_common.buttons.show_all_with_count', { count: wagePagination?.total })"
                :loading="wageLoading || terminalLoading"
                @click="toggleReconciliationWages"
              />
            </template>
          </ui-Card>
          <ui-Card v-if="permission" class="mt-md">
            <template #header>
              <div class="flex justify-between">
                <ui-Skeleton :loading="loading" :width="140" :height="20">
                  <span class="text-heading-600-h2">
                    {{ $t('_form.note.title') }}
                  </span>
                </ui-Skeleton>

                <ui-Button
                  icon="Plus"
                  variant="outlined"
                  type="neutral"
                  :loading="loading"
                  :disabled="payerNotes && payerNotes.length === 3"
                  @click="handleToggleNoteInput"
                />
              </div>
              <div v-show="showNote">
                <ui-Textarea
                  ref="noteArea"
                  v-model="noteValue"
                  class="mt-xl mb-md"
                  :disabled="formLoading"
                  name="note"
                  auto-focus
                  :placeholder="$t('_form.note.placeHolder')"
                  :helper="{
                    type: !!errors?.note ? 'error' : undefined,
                    message: errors?.note,
                  }"
                />
                <div
                  class="flex justify-between float-left"
                  :class="{ 'float-none': payerNotes && payerNotes[0]?.content }"
                >
                  <div class="float-left">
                    <ui-Button
                      size="medium"
                      class="inline-flex main__item--button"
                      type="secondary"
                      :text="$t('_common.buttons.cancel')"
                      :disabled="formLoading"
                      @click="cancel"
                    />
                    <ui-Button
                      class="inline-flex mr-xs main__item--button"
                      size="medium"
                      type="primary"
                      :text="$t('_common.buttons.save')"
                      :disabled="!formMeta?.valid || !noteValue"
                      :loading="formLoading"
                      @click="formSubmit"
                    />
                  </div>
                </div>
              </div>
            </template>
            <template #main>
              <div v-if="payerNotes && payerNotes?.length" class="flex flex-col mt-xl">
                <ui-TimeLine
                  v-for="(item, index) in payerNotes"
                  :key="item"
                  :class="getMarginClass(index, payerNotes)"
                  icon-class="text-text-warning"
                  :is-first="index === 0"
                  :is-last="index === (payerNotes && payerNotes?.length - 1)"
                  icon="MessageEditFill"
                  :caption="
                    item?.user &&
                    $t('_session.show.note.noteBy').concat(' ', item.user.name as string)
                  "
                  :loading="loading"
                  :title="item.content"
                >
                  <template #action>
                    <div class="flex justify-between items-center">
                      <ui-Skeleton :loading="loading" :width="104" class="truncate">
                        <span v-if="areDatesSame(item)" class="text-body-400-b3 text-text-soft">{{
                          toJalali(item.created_at)
                        }}</span>
                        <span v-else class="text-body-400-b3 text-text-soft">
                          {{ $t('_common.buttons.edit').concat(' ', toJalali(item.updated_at)) }}
                        </span>
                      </ui-Skeleton>
                      <ui-Action
                        v-if="permission && !loading"
                        :id="item.id"
                        v-model:eventType="eventType"
                        :selected-id="item.id"
                        :limit="2"
                        :items="actionHandle(item.id, item.content as string, callbackAction)"
                        dir="rtl"
                        @id-value="idValueHandler"
                      />
                    </div>
                  </template>
                </ui-TimeLine>
              </div>
            </template>
          </ui-Card>
        </div>
      </div>
    </div>
    <ReconciliationWages v-if="showReconciliationModal" />
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';
import { FormMeta } from 'vee-validate';
import {
  ReconciliationType,
  TerminalPermissionEnum,
  NoteType,
  ReconciliationStatusEnum,
  ReconcileTypeEnum,
} from '@/graphql/graphql';
import { useReconcilitionDetaiSchema } from '@/composables/reconciliation/useReconciliationDetailSchema';
import { useSessionExcelExportMutation } from '@/composables/excelExport/useSessionExcelExportMutation';
import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { RECONCILIATION_WAGES_PAGE_SIZE } from '~/consts/reconciliation';

export type ErrorsType = globalThis.ComputedRef<Partial<Record<'note', string | undefined>>>;
export interface Props {
  data?: ReconciliationType;
  loading?: boolean;
  showNote?: boolean;
  payerNotes?: NoteType[];
  noteId: string | null;
}
const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  payerNotes: undefined,
  noteId: '',
});
const emit = defineEmits(['update:noteId']);
const { showNote } = toRefs(props);
const noteValue = ref();
const formMeta:
  | globalThis.ComputedRef<
      FormMeta<
        Partial<{
          note: string;
        }>
      >
    >
  | undefined = inject('form_meta');
const toggle = inject<(() => void | undefined) | undefined>('toggle');
const deleteNote = inject<(() => void | undefined) | undefined>('deleteNote');
const formLoading = inject('form_loading');
const formSubmit = inject('form_submit');
const route = useRoute();
const router = useRouter();
const errors: globalThis.ComputedRef<Partial<Record<'note', string | undefined>>> | undefined =
  inject('form_errors');
const { data, payerNotes, loading } = toRefs(props);
const { md } = useSize();
const { actionHandle } = useSessionAction();
const { detailList, detailStyle } = useReconcilitionDetaiSchema();
const store = useTerminalStore();
const { sessionExcelExpor } = useSessionExcelExportMutation();
const { mutate, onDone, onError, loading: loadingExcel } = sessionExcelExpor();
const { numberFormat } = useMath();
const { toJalali, compareDates } = useDate();
const terminal = useTerminalStore();
const { active } = useActiveTerminal();
const { activeTerminal, loading: terminalLoading } = useTerminalQuery();
const { data: wages, loading: wageLoading, pagination: wagePagination } = useReconciliationWages();
const eventType = ref();
const showReconciliationModal = ref(false);
const cancel = () => {
  toggle && toggle();
};
const showAllSessions = computed(() => Number(data.value?.sessions_count ?? 0) > 10);
const showAllSessionsButtonNumber = computed(() => data.value?.sessions_count ?? 0);
const tableData = computed(
  () =>
    (data.value &&
      data.value.sessions &&
      data.value.sessions.map(i => ({
        amount: i?.amount && numberFormat(i.amount),
        fee: i?.fee && numberFormat(i.fee),
        id: i?.id,
        created_at: _isNil(i?.created_at) ? '-' : toJalali(i?.created_at),
      }))) ||
    []
);
const seeAllSessions = () => {
  router.push(`/panel/${terminal.currentDomain}/session?reconciliation_id=${data?.value?.id}`);
};
const permission = computed(
  () =>
    activeTerminal.value &&
    _includes(activeTerminal.value?.permissions, TerminalPermissionEnum.NoteEdit)
);
const handleDeleteNote = () => {
  noteValue.value = '';
  deleteNote && deleteNote();
};
const exportExcel = () => {
  const variables = {
    terminal_id: store.currentTerminal,
    reconciliation_id: route.params.id,
  };
  mutate(variables);
  onDone(() => {
    router.push('/panel/export');
  });
  onError(error => {
    errorHandler(error);
  });
};
const handleToggleNote = (value: string) => {
  if (!showNote.value) {
    noteValue.value = value;
  }
  toggle && toggle();
};
const areDatesSame = (item: NoteType) =>
  compareDates(item.created_at, item.updated_at).result === 'same';
const getMarginClass = (index: number, payerNotes?: NoteType[]) =>
  index === (payerNotes && payerNotes.length - 1) ? 'mb-lg' : '';
const handleToggleNoteInput = () => {
  emit('update:noteId', null);
  toggle && toggle();
};
const idValueHandler = (value: string) => {
  emit('update:noteId', value);
};
const callbackAction = (id: string, value: string, type: string) => {
  if (type === 'edit') {
    emit('update:noteId', id);
    handleToggleNote(value);
  } else {
    emit('update:noteId', id);
    handleDeleteNote();
  }
};
const handleNavigateBankAccount = () => {
  router.push(`/panel/${terminal.currentDomain}/settings?menu=Account`);
};
const hasShaparakRejected = computed(
  () =>
    data.value &&
    active.reconcile_type === ReconcileTypeEnum.Normal &&
    (data.value.status === ReconciliationStatusEnum.Rejected ||
      data.value.status === ReconciliationStatusEnum.Reversed) &&
    data.value.description === 'عدم وجود داده مورد ارجاع ٬ شماره شبای تسویه.'
);
const toggleReconciliationWages = () => {
  showReconciliationModal.value = !showReconciliationModal.value;
};
provide('toggleReconciliationWages', toggleReconciliationWages);
</script>
<style lang="scss" scoped>
.main {
  @apply flex lg:flex-row flex-col gap-md;
  &__item--detail {
    @apply flex flex-col w-full gap-xs p-md border-border-divider;
  }
  &__item--button {
    @apply inline-flex;
  }
}
</style>
