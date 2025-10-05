<template>
  <div class="pb-3xl w-full container-xl">
    <investmentBaseHeader :loading="loading" />
    <investmentBaseMain />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: 'investments',
  layout: 'terminal',
});
const loading = ref(false);
useHead({
  title: 'فرصت های سرمایه‌گذاری',
});
</script>
