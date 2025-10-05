<template>
  <ui-Modal
    v-if="showTemplateModal"
    text="زمان‌بندی واریز سود"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[500px]"
    @close="$emit('close')"
  >
    <template #body>
      <ui-TimeLine
        v-for="(item, index) in data"
        :key="index"
        :title="item.title"
        :caption="toJalali(item.date, 'jDD jMMMM jYYYY', 'jDD jMMMM jYYYY')"
        :icon="item.isPassed ? 'CheckMarkCircleFill' : 'ClockTimeFast'"
        :icon-class="item.isPassed ? 'text-primary' : 'text-text-soft'"
      >
      </ui-TimeLine>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
const { toJalali } = useDate();
defineProps<{
  showTemplateModal: boolean;
  data: object;
}>();
defineEmits(['close']);
</script>
