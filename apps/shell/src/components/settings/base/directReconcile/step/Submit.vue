<template>
  <div class="flex flex-col gap-xl">
    <p class="text-body-400-b3 text-text-soft">
      {{ caption }}
    </p>
    <div
      v-if="disabledServices.length"
      class="p-md border border-border-divider rounded-md flex-col gap-md w-full"
    >
      <div class="grid sm:grid-cols-2 gap-xs">
        <div
          v-for="(service, index) in disabledServices"
          :key="index"
          class="flex items-center gap-xs"
        >
          <ui-Icon :name="service.icon" class="text-icon-warning" />
          <p class="text-body-400-b3 text-text">
            <i18n-t
              :keypath="`_direct_reconcile.terminal_setting.activation_modal.disabled_services.${service.title}`"
            >
              <template #extra>
                <span class="text-body-500-b3 text-text-soft">{{
                  $t('_direct_reconcile.terminal_setting.activation_modal.on_this_terminal')
                }}</span>
              </template>
            </i18n-t>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Service {
  title: string;
  icon: string;
}
interface Props {
  disabledServices: Service[];
}
const props = defineProps<Props>();
const { disabledServices } = toRefs(props);
const t = useI18n();
const caption = computed(() =>
  disabledServices.value?.length > 0
    ? t('_direct_reconcile.terminal_setting.activation_modal.disabled_services_notice')
    : t('_direct_reconcile.terminal_setting.activation_modal.disabled_services_notice_empty')
);
</script>
