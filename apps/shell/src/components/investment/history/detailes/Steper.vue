<template>
  <ui-Card>
    <template #header>
      <div class="flex justify-between items-center h-[42px]">
        <ui-skeleton :loading="loading" :height="20" :width="100">
          <span class="text-heading-600-h2"> تقویم سرمایه‌گذاری </span>
        </ui-skeleton>
      </div>
    </template>
    <template #main>
      <ui-skeleton :loading="loading" :height="20" :width="100">
        <ui-TimeLine
          v-for="(item, index) in timeLines"
          :key="index"
          :title="item.title"
          :caption="toJalali(item.date, 'jDD jMMMM jYYYY', 'jDD jMMMM jYYYY')"
          :icon="item.icon"
          :icon-class="item.class"
        >
          <template #action>
            <div class="flex justify-between items-center">
              <a
                v-if="item.filePath"
                :href="item.filePath"
                target="_blank"
                download
                text="دانلود"
                class="text-bode-400-b3 flex ml-auto text-primary cursor-pointer"
              >
                <ui-Icon name="Download" />
              </a>
            </div>
          </template>
        </ui-TimeLine>
      </ui-skeleton>
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['data', 'loading']);
const { toJalali } = useDate();
const timeLines = ref<object[]>([]);

watch(
  () => props.data,
  () => {
    props.data.forEach((element: { isPassed: boolean; title: string }) => {
      timeLines.value.push({
        date: element.date,
        title: element.title,
        icon: element.isPassed ? 'CheckMarkCircleFill' : 'ClockTimeFast',
        class: element.isPassed ? 'text-primary' : 'text-text-soft',
      });
    });
  }
);
</script>
