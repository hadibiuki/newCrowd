<template>
  <div class="flex flex-col gap-sm items-center">
    <slot name="icon" />
    <h1
      :class="titleClass"
      class="font-YekanBakhFaNum font-extrabold text-display-700-d4 flex items-center justify-center text-center"
    >
      اطلاعات شرکت حقوقی را وارد کنید
    </h1>
    <p class="text-body-400-b2 font-medium text-text-soft rtl">
      موارد زیر را برای ارتقاء حساب به حقوقی وارد کنید
    </p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  titleClass: string;
  caption: string;
}
withDefaults(defineProps<Props>(), {});
</script>
