<template>
  <div class="flex flex-col gap-sm items-center">
    <ui-Icon name="CheckMarkCircleFill" class="text-text-success !text-[48px]" />
    <h1
      :class="titleClass"
      class="font-YekanBakhFaNum font-extrabold text-display-700-d4 flex items-center justify-center text-center"
    >
      حساب شما با موفقیت به حساب حقوقی ارتقاء یافت
    </h1>
    <p class="text-body-400-b2 font-medium text-text-soft rtl text-center mb-3xl">
      از این پس می‌توانید علاوه بر حساب حقیقی از حساب حقوقی کسب و کارتان نیز بهره‌مند شوید
    </p>
    <ui-Button class="w-full mb-md" text="ورود به پیشخوان" @click="$router.push('/')" />
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
