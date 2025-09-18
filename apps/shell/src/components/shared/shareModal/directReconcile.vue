<template>
  <ui-Modal
    :text="$t('_direct_reconcile.initial_modal.title')"
    class="direct-reconcile-modal"
    close-icon
    @close="emits('close')"
  >
    <template #body>
      <div class="flex flex-col gap-md">
        <ui-Skeleton v-if="loading" :loading="true" full-width :height="74" />
        <ui-InlineMessage
          v-else-if="!hasAtLeastOneShaparakTerminal"
          type="warning"
          class="!mt-0"
          :description="$t('_direct_reconcile.initial_modal.ineligible_inline_message')"
        />

        <p class="text-text-soft text-body-400-b2">
          {{ $t('terminal.selectTerminal') }}
        </p>

        <div v-if="loading" class="flex justify-end flex-col items-end m-xs" dir="ltr">
          <!-- description -->
          <div
            v-for="(_, i) in 3"
            :key="i"
            class="flex gap-sm justify-between p-md w-full terminal-item"
          >
            <ui-Skeleton :width="16" :height="16" />
            <div class="flex gap-sm">
              <div class="flex flex-col gap-2xs items-end">
                <ui-Skeleton :width="64" :height="16" />
                <ui-Skeleton :width="96" :height="12" />
              </div>
              <ui-Skeleton :width="40" :height="40" />
            </div>
          </div>
        </div>
        <!-- list of terminals -->
        <div v-else>
          <div
            v-for="i in sortedTerminal"
            :key="i?.id"
            class="terminal-item"
            :class="[isDisable(i) ? '!cursor-not-allowed' : 'cursor-pointer']"
            @click="navigateToSetting(i)"
          >
            <div class="flex gap-sm justify-between">
              <div class="flex gap-sm flex-1 justify-end min-w-0">
                <div class="relative flex-shrink-0">
                  <SharedTerminalLogo
                    :logo="i?.have_logo ? i?.logo : undefined"
                    :class="isDisable(i) ? 'opacity-50' : ''"
                  />
                  <SharedDirectReconcile
                    v-if="checkIsDirectReconcile(i?.reconcile_type!)"
                    class="absolute left-[-2px] bottom-[-2px]"
                  />
                </div>
                <div class="flex flex-col gap-2xs items-end truncate flex-1 min-w-0">
                  <div
                    class="text-body-400-b2 font-medium truncate w-full text-right"
                    :class="isDisable(i) ? 'text-text-disabled' : 'text-text'"
                    dir="rtl"
                  >
                    {{ i?.name }}
                  </div>
                  <div
                    class="text-caption-400-c1 truncate w-full text-right"
                    :class="isDisable(i) ? 'text-text-disabled' : 'text-text-soft '"
                  >
                    {{ i?.domain }}
                  </div>
                </div>
              </div>
              <div>
                <ui-Tooltip
                  v-if="checkIsDirectReconcile(i?.reconcile_type!)"
                  :content="$t('_direct_reconcile.initial_modal.activate_direct_reconcile_tooltip')"
                >
                  <ui-Icon name="CheckMarkCircleOutlined" class="text-icon-success" />
                </ui-Tooltip>
                <ui-Tooltip
                  v-else-if="
                    isExpressTerminal(i?.reconcile_type!) || i.status !== TerminalStatusEnum.Active
                  "
                  :content="$t('_direct_reconcile.initial_modal.express_tooltip')"
                >
                  <ui-Icon name="WarningOutline" class="text-text-soft cursor-pointer" />
                </ui-Tooltip>
                <ui-Tooltip
                  v-else-if="checkHasDirectReconcile(i)"
                  :content="$t('_direct_reconcile.initial_modal.previously_activated_tooltip')"
                >
                  <ui-Icon name="WarningOutline" class="text-text-soft cursor-pointer" />
                </ui-Tooltip>
                <ui-Icon v-else name="AngleLeft" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <ui-Button
        class="mr-auto"
        type="secondary"
        variant="outlined"
        :text="$t('common.cancel')"
        :loading="loading"
        :disabled="loading"
        @click="emits('close')"
      />
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { includes } from 'lodash';
import {
  ReconcileTypeEnum,
  TerminalPermissionEnum,
  TerminalStatusEnum,
  TerminalType,
} from '~/graphql/graphql';

const emits = defineEmits(['close']);
const { setActiveTerminal } = useActiveTerminal();
const router = useRouter();
const { $notify } = useNuxtApp();
const t = useI18n();
const { loading, sortedTerminal } = useTerminalQuery();
const { checkIsDirectReconcile, checkHasDirectReconcile } = useDirectReconcile();
const isExpressTerminal = (type: ReconcileTypeEnum) => type === ReconcileTypeEnum.Wallet;
const navigateToSetting = (terminal: TerminalType) => {
  if (isDisable(terminal)) {
    return;
  }
  if (!includes(terminal?.permissions, TerminalPermissionEnum.TerminalEdit)) {
    $notify({
      isRead: false,
      message: t('_common.permission.not_access_this_page'),
      type: 'error',
    });

    return;
  }
  setActiveTerminal(terminal);
  nextTick(() => {
    emits('close');
    router.push(
      `/panel/${encodeURIComponent(terminal.domain as string)}/settings?menu=DirectReconcile`
    );
  });
};
const isDisable = (terminal: TerminalType) => {
  if (terminal.status !== TerminalStatusEnum.Active) {
    return true;
  }
  if (terminal.reconcile_type !== ReconcileTypeEnum.Normal) {
    return true;
  }
  if (checkHasDirectReconcile(terminal)) {
    return true;
  }

  return false;
};
const hasAtLeastOneShaparakTerminal = computed(() =>
  sortedTerminal.value.some(t => t.reconcile_type === ReconcileTypeEnum.Normal)
);
</script>
<style lang="scss" scoped>
.terminal-item {
  @apply border-x hover:bg-surface-hover border-border-divider active:bg-surface-pressed focus-visible:border focus-visible:border-interactive-focus p-md;

  &:first-child {
    @apply border-t rounded-t-sm;
  }

  &:last-child {
    @apply border-b border-t rounded-b-sm;
  }

  &:not(:first-child):not(:last-child) {
    @apply border-t;
  }
}

:deep(.direct-reconcile-modal) {
  @apply w-full lg:max-w-[400px];

  @media (min-height: 600px) {
    max-height: 540px !important;
  }
}
</style>
