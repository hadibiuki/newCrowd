<template>
  <ui-Table :loading="true" :columns="[]">
    <!-- loading template -->
    <template #loadingSkeleton>
      <div v-for="index in pageSize" :key="index" class="loading">
        <div
          class="grid border-t border-t-border-divider"
          style="grid-template-columns: 50% 25% 25%"
        >
          <div class="my-auto">
            <div class="flex items-center gap-sm px-md py-md">
              <ui-Skeleton :width="40" :height="40" radius="sm" />
              <div class="flex flex-col">
                <ui-Skeleton :width="200" class="pb-2xs" />
                <ui-Skeleton :width="80" />
              </div>
            </div>
          </div>
          <div class="my-auto">
            <ui-Skeleton :width="60" class="px-md py-md" />
          </div>
          <div class="my-auto">
            <ui-Skeleton :width="60" class="px-md py-md" />
          </div>
        </div>
      </div>
    </template>
  </ui-Table>
</template>
<script setup lang="ts">
import { RECONCILIATION_WAGES_PAGE_SIZE } from '~/consts/reconciliation';

const pageSize = RECONCILIATION_WAGES_PAGE_SIZE;
</script>
