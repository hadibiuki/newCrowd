<template>
  <div class="grid items-start grid-cols-12 gap-md" dir="rtl">
    <div class="col-span-full xl:col-span-8 h-full">
      <investmentHistoryDetailesData :loading="loading" :data="data" />
      <investmentHistoryDetailesPayments :loading="loading" :data="data" class="mt-lg" />
    </div>
    <div class="col-span-full xl:col-span-4 h-full">
      <investmentHistoryDetailesSteper :loading="loading" :data="data.events" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
defineProps(['data', 'loading']);
</script>
