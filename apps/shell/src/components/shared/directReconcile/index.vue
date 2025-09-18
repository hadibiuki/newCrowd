<template>
  <div
    class="flex items-center justify-center"
    :class="justIcon ? '' : 'bg-zarin/10 gap-2xs pr-2xs pl-xs h-xl rounded-[999px] w-fit'"
  >
    <ui-Tooltip
      :content="tooltip ? $t('_common.page_title.direct_reconcile') : undefined"
      class="flex items-center justify-center"
    >
      <ui-Icon
        name="ThunderLightningFill"
        class="rounded-circle text-body-400-b3 text-surface bg-[linear-gradient(198deg,_#ffd60a_7.5%,_#f0ba09_92%)]"
        :class="iconSize"
      />
    </ui-Tooltip>
    <span v-if="!justIcon" class="text-body-500-b3 text-text">{{
      $t('_common.page_title.direct_reconcile')
    }}</span>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  justIcon?: boolean;
  tooltip?: boolean;
  size?: 'md' | 'lg';
}
const props = withDefaults(defineProps<Props>(), {
  justIcon: true,
  tooltip: false,
  size: 'md',
});
const { size } = toRefs(props);
const iconSize = computed(() => {
  switch (size.value) {
    case 'md':
      return '!text-[16px]';
    case 'lg':
      return '!text-[24px]';
    default:
      return '!text-[16px]';
  }
});
</script>
