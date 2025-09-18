<template>
  <div class="overview" dir="rtl">
    <ui-Card class="max-w-[360px] w-full">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-heading-600-h2">{{ $t('dashboard.terminals') }}</span>
          <ui-Button
            icon="Plus"
            type="tertiary"
            variant="outlined"
            class="w-[40px] h-[40px]"
            @click="$router.push(addTerminalUrl())"
          />
        </div>
      </template>
      <template #main>
        <div class="text-body-400-b2 text-text-soft mb-md mt-xl">
          {{ $t('terminal.selectTerminal') }}
        </div>
        <div v-if="loading">
          <SharedTerminalSkeleton v-for="i in 2" :key="i" dir="ltr" class="terminal-item" />
        </div>
        <!-- list of terminals -->
        <template v-if="data">
          <div
            v-for="i in sortedTerminal"
            :key="i?.id"
            class="terminal-item"
            @click="handleChangeTerminal(i)"
          >
            <!-- description -->
            <div class="flex gap-sm justify-between">
              <div class="flex gap-sm truncate">
                <SharedTerminalLogo :logo="i?.have_logo ? i?.logo : undefined" />
                <div class="flex flex-col gap-2xs items-end truncate">
                  <div
                    class="text-body-400-b2 font-medium text-text truncate w-full text-right"
                    dir="rtl"
                  >
                    {{ i?.name }}
                  </div>
                  <div class="text-caption-400-c1 text-text-soft truncate w-full text-right">
                    {{ i?.domain }}
                  </div>
                </div>
              </div>
              <div>
                <ui-Icon name="AngleLeft" />
              </div>
            </div>
            <!-- badges -->
            <div class="flex justify-start pr-[52px]">
              <div>
                <ui-Status
                  :text="statusHandler(i?.status).text"
                  :type="statusHandler(i?.status).type"
                />
              </div>
              <SharedDirectReconcile
                v-if="checkIsDirectReconcile(i?.reconcile_type!)"
                :just-icon="false"
                class="mr-2xs"
              />
              <div v-if="Number(i?.pin)">
                <ui-Divider type="vertical" :height="24" class="mx-sm" />
              </div>
              <div>
                <ui-Icon
                  v-if="Number(i?.pin)"
                  name="PinFill"
                  class="text-zarin-dark !text-heading-600-h3"
                />
              </div>
            </div>
          </div>
        </template>
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
import { TerminalType } from '@/graphql/graphql';

const { data, loading, sortedTerminal } = useTerminalQuery();
const { addTerminalUrl } = useAuth();
const { statusHandler } = useTerminalStatus();
const router = useRouter();
const { setActiveTerminal } = useActiveTerminal();
const { checkIsDirectReconcile } = useDirectReconcile();
const handleChangeTerminal = (terminal: TerminalType) => {
  setActiveTerminal(terminal);

  return router.push(`/panel/${encodeURIComponent(terminal?.domain as string)}/dashboard`);
};
</script>
<style lang="scss" scoped>
.overview {
  @apply flex justify-center;
}
.terminal-item {
  @apply flex flex-col gap-sm border-x hover:bg-surface-hover border-border-divider active:bg-surface-pressed focus-visible:border focus-visible:border-interactive-focus p-md cursor-pointer;

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
</style>
