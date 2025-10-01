<template>
  <ui-Modal
    v-if="showTemplateModal"
    text="دعوت به حساب حقوقی"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[800px]"
    @close="$emit('close')"
  >
    <template #body>
      <div class="flex-row items-center">
        <ui-Illustration name="InviteUser" class="mx-auto w-full mb-xl" />
        <p class="text-text-soft text-body-400-b2 text-text-soft mb-xl">
          <strong>{{ data.companyName }}</strong> از شما دعوت کرد تا به عنوان اپراتور این حساب حقوقی نیز فعالیت کنید
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-xs w-full">
        <ui-Button type="secondary" size="medium" text="رد کردن" @click="$emit('reject')" />
        <ui-Button
          :disabled="loading"
          :loading="loading"
          size="medium"
          text="پذیرفتن دعوت"
          @click="$emit('accept')"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
defineProps<{
  showTemplateModal: boolean;
  loading: boolean;
  data: object;
}>();
defineEmits(['close', 'reject', 'accept']);
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
