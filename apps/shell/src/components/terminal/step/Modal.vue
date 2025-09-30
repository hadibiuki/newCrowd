<template>
  <ui-Modal
    v-if="showTemplateModal"
    text="تایید قرار‌داد"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[500px]"
    @close="$emit('close')"
  >
    <template #body>
      <ui-Illustration name="NoResult" class="flex justify-cetner mx-auto mb-md" />

      <p class="text-body-400-b2 font-medium text-text-soft rtl text-center">
        شناسه ملی وارد شده در سامانه سجام ثبت نشده است.
      </p>
      <p class="text-body-400-b2 font-medium text-text-soft rtl text-center">
        می‌توانید با واردکردن نام شرکت وارد شوید.
      </p>
      <ui-TextField v-model="name" placeholder="نام شرکت" :label="false" class="w-full my-md" />
      <ui-Button
        :disabled="!name.length"
        :loading="loading"
        class="w-full"
        :text="$t('signup.create_account')"
        @click="$emit('next', name)"
      />
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
defineProps<{
  showTemplateModal: boolean;
  loading: boolean;
}>();
defineEmits(['close', 'next']);
const name = ref('');
</script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
  }
}
.rtl {
  direction: rtl;
}

// .main__item--heading {
//   flex: 1 0 2%;
// }
</style>
