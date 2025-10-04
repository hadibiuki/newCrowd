<template>
  <div dir="rtl">
    <ui-Card>
      <template #main>
        <ui-skeleton :loading="projectLoading" :height="350" :width="0">
          <div
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-sm mt-xl gap-xs"
            v-if="projects.length"
          >
            <SharedProductCard v-for="project in projects" :key="project.id" :project="project" />
          </div>
          <div v-else class="flex jsutify-content items-center h-full">
            <ui-EmptyState
              :description="$t('transactions.no_invest_exist')"
              :title="$t('transactions.chance_to_invest')"
              vector="Placeholder"
            />
          </div>
        </ui-skeleton>
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
import { getAllProjects } from '~/restApi/project';

export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
const projects = ref([]);
const projectLoading = ref(true);
onMounted(() => {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getAllProjects({ pageSize: 12, pageNumber: 1, internalStatus: 2 })
    // eslint-disable-next-line promise/always-return
    .then(res => {
      projects.value = res.data.items;
    })
    .finally(() => {
      projectLoading.value = false;
    });
});
</script>
