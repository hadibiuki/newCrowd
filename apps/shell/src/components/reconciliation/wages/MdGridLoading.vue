<template>
  <div>
    <ui-Bankcard v-for="index in pageSize" :key="index" :loading="true" class="mt-xl" />
  </div>
</template>
<script setup lang="ts">
import { RECONCILIATION_WAGES_PAGE_SIZE } from '~/consts/reconciliation';

const pageSize = RECONCILIATION_WAGES_PAGE_SIZE;
</script>
