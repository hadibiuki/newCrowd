<template>
  <ui-Modal
    :footer-boarder="false"
    :is-header="false"
    class="w-full lg:max-w-[400px] max-h-[528px]"
    @close="$emit('close')"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center">
        <div class="h-[240px] mb-md">
          <ui-Skeleton v-if="loading" class="rounded-t-md" radius="md" :width="400" :height="240" />
          <img
            v-show="!loading"
            class="w-[400px] rounded-t-md"
            src="../../../public/img/welcome.png"
            alt="welcome"
            @load="() => (loading = false)"
          />
        </div>
        <div class="px-md mb-xl">
          <div class="text-display-700-d4 font-YekanBakhFaNum font-extrabold text-center">
            {{ $t('_helper.welcome.title') }}
          </div>
          <div class="text-body-400-b2 text-center text-text-soft">
            <span>
              {{ $t('_helper.welcome.description_1') }}
            </span>
            <br />
            <span>
              {{ $t('_helper.welcome.description_2') }}
            </span>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-xs border-t border-t-border-divider">
        <ui-Button
          class="flex-grow"
          :text="$t('notif_settings.guidance')"
          @click="handleStartTour"
        />
        <ui-Button
          type="secondary"
          :text="$t('session.export.not_now')"
          @click="handleCancelTour"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
const emits = defineEmits(['close']);
const loading = ref(true);
const authStore = useAuthStore();
const handleCancelTour = () => {
  nextTick(() => {
    authStore.tourActive = true;
    tour.show('userDefault');
  });
  setTimeout(() => {
    tour.complete();
  }, 5000);
  emits('close');
};
const handleStartTour = () => {
  emits('close');
  nextTick(() => {
    authStore.tourActive = true;
    tour.show('terminal');
  });
};
</script>
<style lang="scss" scoped>
:deep(.modal__body__slot) {
  @apply p-0;
}
</style>
