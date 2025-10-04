<template>
  <div class="pb-3xl w-full container-xl">
    <investmentHistoryHeader :loading="loading" />
    <investmentHistoryMain />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  name: 'history',
  layout: 'terminal',
});
const loading = ref(false);
useHead({
  title: 'فرصت های سرمایه‌گذاری',
});
</script>
